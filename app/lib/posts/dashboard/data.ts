import { sql } from "@vercel/postgres";
import { CategoryReport, CommentReport, PostReport } from "./definitions";

export async function fetchPostsReport() {
	try {
		await new Promise((resolve) => setTimeout(resolve, 3000));

		const data = await sql<PostReport>`
        SELECT 
            p.id AS post_id,
            p.title,
            COUNT(DISTINCT vl.id) AS view_count,
            COUNT(DISTINCT l.id) AS like_count
        FROM 
            posts p
        LEFT JOIN 
            view_logs vl ON p.id = vl.post_id
        LEFT JOIN 
            likes l ON p.id = l.post_id
        GROUP BY 
            p.id, p.title
        ORDER BY 
            view_count DESC, like_count DESC
        LIMIT 5
        `;

		return data.rows;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetchPostsReport.");
	}
}

export async function fetchCategoryReport() {
	try {
		await new Promise((resolve) => setTimeout(resolve, 3000));

		const data = await sql<CategoryReport>`
        SELECT 
            c.id AS category_id,
            c.name AS category_name,
            COUNT(DISTINCT p.id) AS post_count,
            COUNT(DISTINCT vl.id) AS total_views,
            COUNT(DISTINCT l.id) AS total_likes
        FROM 
            categories c
        LEFT JOIN 
            posts p ON c.id = p.category_id
        LEFT JOIN 
            view_logs vl ON p.id = vl.post_id
        LEFT JOIN 
            likes l ON p.id = l.post_id
        GROUP BY 
            c.id, c.name
        ORDER BY 
            total_views DESC, total_likes DESC
        `;

		return data.rows;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetchCategoryReport.");
	}
}

export async function fetchCommentsReport() {
	try {
		await new Promise((resolve) => setTimeout(resolve, 3000));

		const data = await sql<CommentReport>`
           WITH comment_stats AS (
                SELECT 
                    p.id AS post_id,
                    p.title,
                    COUNT(c.id) AS comment_count,
                    COUNT(DISTINCT c.user_id) AS unique_commenters
                FROM 
                    posts p
                LEFT JOIN 
                    comments c ON p.id = c.post_id
                GROUP BY 
                    p.id, p.title
            )
            SELECT 
                post_id,
                title,
                comment_count,
                unique_commenters
            FROM 
                comment_stats
            ORDER BY 
                comment_count DESC
            LIMIT 5
        `;

		return data.rows;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetchCommentsReport");
	}
}
