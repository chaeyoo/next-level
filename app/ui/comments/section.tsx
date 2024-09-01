import { Comment } from "@/app/lib/comments/definitions";
import { auth } from "@/auth";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import ReplyForm from "./reply-form";
import { DeleteComment } from "./buttons";
import EditCommentForm from "./edit-form";

export default async function CommentSection({
	comments,
	postId,
}: {
	comments: Comment[];
	postId: string;
}) {
	const session = await auth();
	const userId = session?.user.id || undefined;

	const renderComment = (comment: Comment, level: number = 0) => {
		const replies = comments.filter((reply) => reply.parent_id === comment.id);

		return (
			<div key={comment.id} className={`mb-4 ${level > 0 ? "pl-10" : ""}`}>
				<div className="flex items-start space-x-3">
					<div className="flex-shrink-0">
						<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
							<span className="text-sm font-semibold">
								{comment.user_name.charAt(0).toUpperCase()}
							</span>
						</div>
					</div>
					<div className="flex-grow">
						<div className="bg-gray-50 rounded-lg p-3">
							<div className="flex justify-between items-center mb-2">
								<span className="font-semibold text-sm">
									{comment.user_name}
								</span>
								<span className="text-xs text-gray-500">
									{new Date(comment.created_at).toLocaleString()}
								</span>
							</div>
							<div className="mt-2 flex items-end justify-between space-x-2 text-sm">
								<EditCommentForm
									id={comment.id.toString()}
									content={comment.content}
									postId={postId}
									editable={userId === comment.user_id}
								/>
								{userId === comment.user_id && (
									<DeleteComment
										id={comment.id.toString()}
										postId={comment.post_id.toString()}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="mt-3">

				{replies.map((reply) => renderComment(reply, level + 1))}
				</div>
				{level === 0 && (
					<ReplyForm
						parentId={comment.id.toString()}
						postId={postId}
						replyCount={replies.length}
					/>
				)}
			</div>
		);
	};

	const topLevelComments = comments.filter(
		(comment) => comment.parent_id === null
	);

	return (
		<div className="mt-8">
			<h2 className="text-2xl font-bold mb-6">댓글</h2>
			{topLevelComments.map((comment) => renderComment(comment))}
		</div>
	);
}
