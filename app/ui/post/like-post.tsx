import { PostsTable } from "@/app/lib/posts/definitions";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { LikePostBtn, UnlikePostBtn } from "./buttons";
import { auth } from "@/auth";
export default async function LikePost({ post }: { post: PostsTable }) {
	const session = await auth();
	const userId = session?.user.id || undefined;
	return (
		<div
			className={`w-24 mx-auto flex items-center justify-center py-1 pr-2 rounded-full transition-colors duration-200 ${
				post.is_liked
					? "bg-red-100 hover:bg-red-200"
					: "bg-gray-100 hover:bg-gray-200"
			}`}
		>
			{userId !== post.user_id && post.is_liked && (
				<UnlikePostBtn id={post.id} />
			)}

			{userId !== post.user_id && !post.is_liked && (
				<LikePostBtn id={post.id} />
			)}

			{userId === post.user_id && (
				<button className="p-2" disabled>
					<HeartSolid className="w-6 h-6 text-slate-500" />
				</button>
			)}
			<span
				className={`font-semibold text-lg ${
					post.is_liked ? "text-red-700 " : "text-gray-500"
				}`}
			>
				{post.like_count}
			</span>
		</div>
	);
}
