import { PostsTable } from "@/app/lib/posts/definitions";
import { sanitize } from "isomorphic-dompurify";

export default function ViewPost({ post }: { post: PostsTable }) {
	const sanitizedContent = sanitize(post.content);

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<div className="mb-6">
				<span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
					{post.category_name}
				</span>
			</div>
			<h1 className="text-4xl font-bold mb-8 text-gray-900">{post.title}</h1>
			<div className="bg-white shadow-md rounded-lg overflow-hidden">
				<div
					className="prose prose-lg max-w-none p-6 bg-white"
					dangerouslySetInnerHTML={{ __html: sanitizedContent }}
				/>
			</div>
		</div>
	);
}
