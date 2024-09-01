"use client";

import { createReply, ReplyState } from "@/app/lib/comments/action";
import { ArrowTurnDownRightIcon } from "@heroicons/react/24/solid";
import { useActionState, useEffect, useState } from "react";

export default function ReplyForm({
	parentId,
	postId,
	replyCount,
}: {
	parentId: string;
	postId: string;
	replyCount: number;
}) {
	const [isReplying, setIsReplying] = useState(false);
	const [replyContent, setReplyContent] = useState("");
	const initialState: ReplyState = { message: null, errors: {} };
	const [state, formAction] = useActionState(createReply, initialState);

	useEffect(() => {
		if (state?.message === "success") {
			setReplyContent("");
			setIsReplying(false);
		}
	}, [state]);

	return (
		<div className={`mt-2 ${replyCount > 0 ? "ml-10" : ""}`}>
			{!isReplying ? (
				<button
					onClick={() => setIsReplying(true)}
					className="text-blue-500 hover:text-blue-600 flex items-center text-sm"
				>
					<ArrowTurnDownRightIcon className="w-5 mr-1 ml-10" />
					대댓글
				</button>
			) : (
				<form action={formAction} className="mt-2">
					<textarea
						id="content"
						name="content"
						value={replyContent}
						onChange={(e) => setReplyContent(e.target.value)}
						className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						rows={3}
						placeholder="대댓글을 입력해주세요."
					/>
					<input id="postId" name="postId" value={postId} type="hidden" />
					<input id="parentId" name="parentId" value={parentId} type="hidden" />
					{state?.errors?.content && (
						<p className="text-red-500 text-sm mt-2">{state.errors.content}</p>
					)}
					<div className="flex justify-end mt-2 space-x-2">
						<button
							type="button"
							onClick={() => setIsReplying(false)}
							className="px-2 py-1 text-gray-600 border rounded-lg border-slate-300 text-xs"
						>
							취소
						</button>
						<button
							type="submit"
							className="px-2 py-1 bg-slate-500 text-white rounded-lg text-xs"
						>
							등록
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
