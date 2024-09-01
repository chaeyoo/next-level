import { Comment } from "@/app/lib/comments/definitions";
import { auth } from "@/auth";

export default async function CommentSection({
	comments,
	postId,
}: {
	comments: Comment[];
	postId: string;
}) {
	console.log(comments, "comments section---");
	const session = await auth();

	return (
		<div className="mt-8">
			<h2 className="text-2xl font-bold mb-4">댓글</h2>
			<hr className="border-t border-gray-300 mb-6" />
			{comments.length === 0 && (
				<div className=" text-gray-700 text-sm">없음</div>
			)}
			{comments.map((v, i) => (
				<div
					key={v.id}
					className={`bg-white p-4 rounded-lg shadow-sm mb-4 ml-${v.depth * 4}`}
				>
					<div className="flex justify-between items-center mb-2">
						<span className="font-semibold">{v.user_name}</span>
						<span className="text-sm text-gray-500">
							{new Date(v.created_at).toLocaleDateString()}
						</span>
					</div>
					<p className="text-gray-700 mb-2">{v.content}</p>
				</div>
			))}
		</div>
	);
}
