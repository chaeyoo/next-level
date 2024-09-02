import { PostsTable } from "@/app/lib/posts/definitions";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { LikePostBtn, UnlikePostBtn } from "./buttons";
import { auth } from "@/auth";
export default async function LikePost({ post }: { post: PostsTable }) {
  const session = await auth();
  const userId = session?.user.id || undefined;
  return (
    <div className="flex items-center space-x-2">
      <span
        className={`p-2 rounded-full transition-colors duration-200 ${
          post.isLiked
            ? "bg-red-100 hover:bg-red-200"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        {userId !== post.user_id && post.isLiked && (
          <UnlikePostBtn id={post.id} />
        )}

        {userId !== post.user_id && !post.isLiked && (
          <LikePostBtn id={post.id} />
        )}

        {userId === post.user_id && <HeartSolid className="w-6 h-6 text-slate-500" />}
      </span>
      <span className="text-sm font-medium text-gray-700">
        {post.like_count}
      </span>
    </div>
  );
}
