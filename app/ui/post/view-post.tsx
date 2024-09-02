import { PostsTable } from "@/app/lib/posts/definitions";
import { auth } from "@/auth";
import { sanitize } from "isomorphic-dompurify";
import Link from "next/link";
import { Comment } from "@/app/lib/comments/definitions";

export default async function ViewPost({
  post,
}: {
  post: PostsTable;
  comments: Comment[];
}) {
  const sanitizedContent = sanitize(post.content);
  const formattedDate = new Date(post.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const session = await auth();
  const userId = session?.user.id || undefined;


  return (
    <div>
      <div className="mb-6">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
          {post.category_name}
        </span>
      </div>
      <h1 className="text-4xl font-bold mb-2 text-gray-900">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {post.user_name} | {formattedDate}
      </p>
      <hr className="border-t border-gray-300 mb-6" />
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div
          className="prose prose-lg max-w-none p-6 bg-white"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/posts"
          className="flex h-10 items-center rounded-lg bg-slate-500 text-white px-4 text-sm font-medium transition-colors hover:bg-slate-700"
        >
          목록
        </Link>
        {userId === post.user_id && (
          <Link
            href={`/posts/${post.id}/edit`}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            수정
          </Link>
        )}
      </div>
    </div>
  );
}
