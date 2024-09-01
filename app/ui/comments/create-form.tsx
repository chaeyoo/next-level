"use client";

import { createComment, CommentState } from "@/app/lib/comments/action";
import { useActionState } from "react";

export default function Form({ postId }: { postId: string }) {
	const initialState: CommentState = { message: null, errors: {} };
	const [state, formAction] = useActionState(createComment, initialState);

	return (
		<div className="mt-8">
			<form action={formAction} className="bg-white rounded-lg shadow-sm">
				<div className="mb-4 flex">
					<textarea
						id="content"
						name="content"
						placeholder="댓글을 입력해주세요."
						className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
						rows={4}
					></textarea>
					<button
						type="submit"
						className="px-3 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
					>
						등록
					</button>
				</div>

				<input id="postId" name="postId" value={postId} type="hidden" />
				{state?.errors?.content && (
					<p className="text-red-500 text-sm mt-2">{state.errors.content}</p>
				)}
				{state?.message && (
					<p className="text-green-500 text-sm mt-2">{state.message}</p>
				)}
			</form>
		</div>
	);
}
