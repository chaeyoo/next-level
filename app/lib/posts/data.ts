import { sql } from "@vercel/postgres";
import { PostsTable } from "./definitions";
import { Comment } from "@/app/lib/comments/definitions";
const ITEMS_PER_PAGE = 6;

export async function fetchPostById(id: string) {
	try {
		const data = await sql<PostsTable>`
        select post.id, 
        post.user_id,
        urs."name" as user_name,
        post.category_id,
        ctgr."name" as category_name,
        post.title,
        post."content",
        post.view_count,
        post.created_at,
        post.updated_at 
        from posts post
        left join users urs
        on urs.id  = post.user_id
        left join categories ctgr
        on ctgr.id = post.category_id 
        where post.id = ${id}
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
		const post = data.rows.map((invoice) => ({
			...invoice,
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

export async function fetchPostsPages(query: string) {
	try {
		const count = await sql` select count(*)
        from posts post
        left join users urs
        on urs.id  = post.user_id 
        where urs.name ILIKE  ${`%${query}%`} OR
        post.title ILIKE ${`%${query}%`}
    `;

		const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
		return totalPages;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch total number of posts.");
	}
}

export async function fetchFilteredPosts(query: string, currentPage: number) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		const posts = await sql<PostsTable>`
        select post.id, 
        post.user_id,
        urs."name" as user_name,
        post.category_id,
        post.title,
        post."content",
        post.view_count,
        post.created_at,
        post.updated_at 
        from posts post
        left join users urs
        on urs.id  = post.user_id  
        where urs.name ILIKE  ${`%${query}%`} OR
        post.title ILIKE ${`%${query}%`}
        ORDER BY post.updated_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;

		return posts.rows;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch posts.");
	}
}
