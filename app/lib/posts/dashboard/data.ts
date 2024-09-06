import { sql } from "@vercel/postgres";
import { CategoryStat, CommentStat, PostStat } from "./definitions";

export async function fetchPostsReport() {
	try {
		await new Promise((resolve) => setTimeout(resolve, 3000));

		const data = await sql<PostStat>`
            WITH this_week AS (
                SELECT 
                date_trunc('week', CURRENT_DATE) + INTERVAL '-30 days' AS week_start,
                date_trunc('week', CURRENT_DATE) AS week_end
            )
            SELECT
            (SELECT COUNT(*)
                FROM posts
                WHERE created_at >= (SELECT week_start FROM this_week)
                AND created_at <= (SELECT week_end FROM this_week)) AS posts_cnt,
            (SELECT COUNT(*)
                FROM likes
                WHERE created_at >= (SELECT week_start FROM this_week)
                AND created_at <= (SELECT week_end FROM this_week)) AS likes_cnt,
            (SELECT COUNT(*)
                FROM view_logs
                WHERE viewed_at >= (SELECT week_start FROM this_week)
                AND viewed_at <= (SELECT week_end FROM this_week)
                AND post_id IN (SELECT id FROM posts WHERE created_at >= (SELECT week_start FROM this_week)
                AND created_at <= (SELECT week_end FROM this_week))) AS total_views,
            (SELECT COUNT(DISTINCT user_id)
            FROM posts
            WHERE created_at >= (SELECT week_start FROM this_week)
            AND created_at <= (SELECT week_end FROM this_week)) AS authors_cnt;
        `;

		return data.rows[0];
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetchPostsReport.");
	}
}

export async function fetchCategoryReport() {
	try {
		await new Promise((resolve) => setTimeout(resolve, 3000));

		const data = await sql<CategoryStat>`
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

		const data = await sql<CommentStat>`
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
