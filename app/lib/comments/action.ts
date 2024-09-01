"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CommentFormSchema = z.object({
	id: z.string(),
	postId: z.string(),
	content: z.string().min(1),
});

const CreateComment = CommentFormSchema.omit({ id: true });
const UpdateComment = CommentFormSchema.omit({ id: true });

export type CommentState = {
	errors?: {
		postId?: string[];
		content?: string[];
	};
	message?: string | null;
};

export async function createComment(
	prevState: CommentState,
	formData: FormData
) {
	const validatedFields = CreateComment.safeParse({
		postId: formData.get("postId"),
		content: formData.get("content"),
	});

	const session = await auth();
	const userId = session?.user.id || "0";
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Create Comment.",
		};
	}
	const { postId, content } = validatedFields.data;

	try {
		await sql`
          INSERT INTO comments (post_id, content, user_id)
          VALUES (${postId}, ${content}, ${userId})
        `;
	} catch (error) {
		console.error(error);
		return {
			message: "Database Error: Failed to Create Comment.",
		};
	}
	revalidatePath(`/posts/${postId}`);
	redirect(`/posts/${postId}`);
}

const ReplyFormSchema = z.object({
	id: z.string(),
	postId: z.string(),
	parentId: z.string(),
	content: z.string().min(1),
});

const CreateReply = ReplyFormSchema.omit({ id: true });

export type ReplyState = {
	errors?: {
		postId?: string[];
		content?: string[];
		parentId?: string[];
	};
	message?: string | null;
};

export async function createReply(prevState: ReplyState, formData: FormData) {
	const validatedFields = CreateReply.safeParse({
		postId: formData.get("postId"),
		parentId: formData.get("parentId"),
		content: formData.get("content"),
	});

	const session = await auth();
	const userId = session?.user.id || "0";

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Create Comment.",
		};
	}

	const { postId, content, parentId } = validatedFields.data;

	try {
		await sql`
            INSERT INTO comments (post_id, content, user_id, parent_id)
            VALUES (${postId}, ${content}, ${userId}, ${parentId})
        `;

		revalidatePath(`/posts/${postId}`);

		return {
			message: "success",
		};
	} catch (error) {
		console.error(error);
		return {
			message: "Database Error: Failed to Create Comment.",
		};
	}
}

export async function deleteComment(id: string, postId: string) {
	const session = await auth();
	const userId = session?.user.id;

	if (!userId) {
		return { message: "Authentication required" };
	}

	try {
		const result = await sql`
        SELECT user_id FROM comments WHERE id = ${id}
    `;

		if (result.rows.length === 0) {
			return { message: "Comment not found" };
		}

		const comment = result.rows[0];

		if (comment.user_id !== userId) {
			return { message: "You don't have permission to delete this comment" };
		}

		await sql`
            CREATE OR REPLACE FUNCTION delete_comment_tree(comment_id INT) RETURNS VOID AS $$
            BEGIN
                DELETE FROM comments
                WHERE id IN (
                    WITH RECURSIVE comment_tree AS (
                        SELECT id FROM comments WHERE parent_id = comment_id
                        UNION ALL
                        SELECT c.id FROM comments c
                        INNER JOIN comment_tree ct ON c.parent_id = ct.id
                    )
                    SELECT id FROM comment_tree
                );
                
                DELETE FROM comments WHERE id = comment_id;
            END;
            $$ LANGUAGE plpgsql;
        `;

		await sql`SELECT delete_comment_tree(${id})`;

		revalidatePath(`/posts/${postId}`);

		return { message: "Comment and its replies deleted successfully" };
	} catch (error) {
		console.error("Failed to delete comment:", error);
		return { message: "Failed to delete comment" };
	}
}

export async function updateComment(
	id: string,
	prevState: CommentState,
	formData: FormData
) {
	const session = await auth();
	const userId = session?.user.id;


	if (!userId) {
		return { message: "Authentication Error: User not logged in." };
	}

	const validatedFields = UpdateComment.safeParse({
		content: formData.get("content"),
		postId: formData.get("postId"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Update Post.",
		};
	}

	const { content, postId } = validatedFields.data;

	try {
		const postOwner = await sql`
		SELECT user_id FROM comments WHERE id = ${id}
	  `;

		if (postOwner.rows[0]?.user_id !== userId) {
			return {
				message:
					"Authorization Error: You don't have permission to update this post.",
			};
		}

		await sql`
		UPDATE comments
		SET content = ${content},
			updated_at = CURRENT_TIMESTAMP
		WHERE id = ${id} AND post_id=${postId} AND user_id = ${userId}
	  `;
	} catch (error) {
		console.log(error, "error");
		return { message: "Database Error: Failed to Update Comment." };
	}

	revalidatePath(`/posts/${postId}`);
	redirect(`/posts/${postId}`);
}
