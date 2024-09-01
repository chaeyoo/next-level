"use client";

import { CommentState, updateComment } from "@/app/lib/comments/action";
import { useActionState, useState } from "react";

interface EditCommentFormProps {
	id: string;
	content: string;
	postId: string;
	editable: boolean;
}

export default function EditCommentForm({
	id,
	content,
	postId,
	editable,
}: EditCommentFormProps) {
	const [isEditing, setIsEditing] = useState(false);
	const initialState: CommentState = { message: null, errors: {} };
	const updateCommentWithId = updateComment.bind(null, id);
	const [state, formAction] = useActionState(updateCommentWithId, initialState);

	return (
		<div className="w-full">
			{!isEditing ? (
				<div className="w-full ">
					<div className="text-gray-700 mb-2 pr-8 w-full ">{content}</div>
					{editable && (
						<button
							onClick={() => setIsEditing(true)}
							className="flex-shrink-0 text-xs text-slate-700 hover:text-slate-300"
						>
							수정
						</button>
					)}
				</div>
			) : (
				<form action={formAction} className="mt-2">
					<textarea
						id="content"
						name="content"
						defaultValue={content}
						className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						rows={3}
					/>
					<input id="postId" name="postId" value={postId} type="hidden" />
					<div className="flex justify-end mt-2 space-x-2">
						<button
							type="button"
							onClick={() => setIsEditing(false)}
							className="p-1 text-gray-600 hover:text-red-500 rounded-lg hover:bg-gray-100 text-xs"
						>
							취소
						</button>
						<button
							type="submit"
							className="p-1 text-slate-600 hover:text-slate-700 rounded-lg hover:bg-green-100 text-xs"
						>
							완료
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
