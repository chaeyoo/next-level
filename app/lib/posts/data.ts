import { sql } from "@vercel/postgres";
import { PostsTable } from "./definitions";
import { Comment } from "@/app/lib/comments/definitions";
import { auth } from "@/auth";
const ITEMS_PER_PAGE = 6;

export async function fetchPostById(id: string) {
	const session = await auth();
	const loginUserId = session?.user.id || undefined;
	try {
		const data = await sql<PostsTable>`
        SELECT 
            post.id, 
            post.user_id,
            urs."name" AS user_name,
            post.category_id,
            ctgr."name" AS category_name,
            post.title,
            post."content",
            post.created_at,
            post.updated_at, 
            li.id AS like_id,
            COALESCE(like_count.total_likes, 0) AS like_count,
            COALESCE(view_count.total_views, 0) AS view_count
        FROM 
            posts post
        LEFT JOIN 
            users urs ON urs.id = post.user_id
        LEFT JOIN 
            categories ctgr ON ctgr.id = post.category_id
        LEFT JOIN 
            likes li ON li.post_id = post.id AND li.user_id = ${loginUserId}
        LEFT JOIN 
            (SELECT post_id, COUNT(*) AS total_likes 
            FROM likes 
            GROUP BY post_id) AS like_count ON like_count.post_id = post.id
        LEFT JOIN 
		    (SELECT post_id, COUNT(*) AS total_views
		     FROM view_logs
		     GROUP BY post_id) AS view_count ON view_count.post_id = post.id 
        WHERE 
            post.id = ${id}
    `;
		const commentsResult = await sql`
    WITH RECURSIVE comment_tree AS (
      SELECT 
        c.*, 
        u.name as user_name,
        0 as depth,
        ARRAY[c.id] as path
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ${id} AND c.parent_id IS NULL
      UNION ALL
      SELECT 
        c.*, 
        u.name as user_name,
        ct.depth + 1,
        ct.path || c.id
      FROM comments c
      JOIN users u ON c.user_id = u.id
      JOIN comment_tree ct ON c.parent_id = ct.id
      WHERE c.post_id = ${id}
    )
    SELECT * FROM comment_tree
    ORDER BY path
  `;
		const post = data.rows.map((post) => ({
			...post,
			is_liked: post.like_id ? true : false,
			// Convert data
		}));

		return {
			post: post[0] as PostsTable,
			comments: commentsResult.rows.map((comment) => ({
				...comment,
				depth: comment.depth,
				path: comment.path,
			})) as Comment[],
		};
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch invoice.");
	}
}

export async function fetchPostsPages(categoryId: string, query: string) {
	try {
		let countQueryStr = `
      SELECT COUNT(*)
      FROM posts post
      LEFT JOIN users urs ON urs.id = post.user_id 
      WHERE (urs.name ILIKE $1 OR post.title ILIKE $1)
    `;

		const params = [`%${query}%`];

		if (categoryId !== "") {
			countQueryStr += ` AND post.category_id = $2`;
			params.push(categoryId);
		}

		const count = await sql.query(countQueryStr, params);

		const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
		return totalPages;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch total number of posts.");
	}
}

export async function fetchFilteredPosts(
	categoryId: string,
	query: string,
	currentPage: number
) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		let postsQueryStr = `
        SELECT 
          post.id, 
          post.user_id,
          urs."name" as user_name,
          post.category_id,
          post.title,
          post."content",
          COALESCE(view_counts.view_count, 0) as view_count,
          post.created_at,
          post.updated_at,
          COALESCE(comment_counts.comment_count, 0) as comment_count
        FROM 
          posts post
        LEFT JOIN 
          users urs ON urs.id = post.user_id
        LEFT JOIN (
          SELECT 
            post_id, 
            COUNT(*) as comment_count
          FROM 
            comments
          GROUP BY 
            post_id
        ) comment_counts ON comment_counts.post_id = post.id
        LEFT JOIN (
          SELECT 
            post_id, 
            COUNT(*) as view_count
          FROM 
            view_logs
          GROUP BY 
            post_id
        ) view_counts ON view_counts.post_id = post.id
        WHERE (urs.name ILIKE $1 OR post.title ILIKE $1)
      `;

		const params = [`%${query}%`];

		if (categoryId !== "") {
			postsQueryStr += ` AND post.category_id = $2`;
			params.push(categoryId);
		}

		postsQueryStr += `
        ORDER BY post.updated_at DESC
        LIMIT $${params.length + 1} OFFSET $${params.length + 2}
      `;

		params.push(ITEMS_PER_PAGE.toString(), offset.toString());

		const posts = await sql.query<PostsTable>(postsQueryStr, params);
		return posts.rows;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch posts.");
	}
}
