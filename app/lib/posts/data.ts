import { sql } from "@vercel/postgres";
import { PostsTable } from "./definitions";
const ITEMS_PER_PAGE = 6;
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
