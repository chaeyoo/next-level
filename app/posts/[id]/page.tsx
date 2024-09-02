import { fetchPostById } from "@/app/lib/posts/data";
import Form from "@/app/ui/comments/create-form";
import CommentSection from "@/app/ui/comments/section";
import LikePost from "@/app/ui/post/like-post";
import ViewPost from "@/app/ui/post/view-post";
import { notFound } from "next/navigation";
import { incrementViewCount } from "@/app/lib/posts/actions";
export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;

	const { post, comments } = await fetchPostById(id);

	if (!post) {
		notFound();
	}
	await incrementViewCount(id);
	
	return (
		<main className="max-w-4xl mx-auto px-4">
			<ViewPost post={post} comments={comments} />
			<LikePost post={post} />
			<CommentSection comments={comments} postId={post.id} />
			<Form postId={post.id} />
		</main>
	);
}
