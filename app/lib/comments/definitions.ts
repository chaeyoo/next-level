import { z } from "zod";

export const CommentSchema = z.object({
	id: z.number(),
	post_id: z.number(),
	user_id: z.string(),
	parent_id: z.number().nullable(),
	content: z.string().min(1, "댓글 내용을 입력해주세요."),
	created_at: z.string(),
	updated_at: z.string(),
	user_name: z.string(),
	depth: z.number(),
	path: z.array(z.number()),
});

export type Comment = z.infer<typeof CommentSchema>;

export const CreateCommentSchema = CommentSchema.pick({
	post_id: true,
	content: true,
	parent_id: true,
});

export type CreateCommentInput = z.infer<typeof CreateCommentSchema>;
