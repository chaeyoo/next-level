import { PostsTable } from "@/app/lib/posts/definitions";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
export default async function LikePost({ post }: { post: PostsTable }) {

	return (
		<div className="flex items-center space-x-2">
			<button
				className={`p-2 rounded-full transition-colors duration-200 ${
					post.isLiked
						? "bg-red-100 hover:bg-red-200"
						: "bg-gray-100 hover:bg-gray-200"
				}`}
			>
				{post.isLiked ? (
					<HeartSolid className="w-6 h-6 text-red-500" />
				) : (
					<HeartIcon className="w-6 h-6 text-gray-500" />
				)}
			</button>
			<span className="text-sm font-medium text-gray-700">{post.like_count}</span>
		</div>
	);
}
