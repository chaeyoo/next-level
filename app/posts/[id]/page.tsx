import { fetchPostById } from "@/app/lib/posts/data";
import ViewPost from "@/app/ui/post/view-post";
import { notFound } from "next/navigation";
export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;

	const { post, comments } = await fetchPostById(id);

	if (!post) {
		notFound();
	}
	return (
		<main>

			<ViewPost post={post} comments={comments} />
		</main>
	);
}
