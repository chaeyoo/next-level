import { fetchPostById } from "@/app/lib/posts/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
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
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Posts", href: "/posts" },
					{
						label: "View Post",
						href: `/posts/${id}`,
						active: true,
					},
				]}
			/>
			<ViewPost post={post} comments={comments} />
		</main>
	);
}
