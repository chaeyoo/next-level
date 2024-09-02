import { PostsTable } from "@/app/lib/posts/definitions";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function ViewCount({ post }: { post: PostsTable }) {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 shadow-sm transition-all hover:bg-gray-200">
      <EyeIcon className="w-4 h-4 mr-2 text-gray-500" />
      <span className="text-sm font-medium">{post.view_count + 1} 조회</span>
    </div>
  );
}
