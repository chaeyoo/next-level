import { fetchCategories } from "@/app/lib/data";
import { fetchPostById } from "@/app/lib/posts/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import EditPosteForm from "@/app/ui/post/edit-form";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
	const userId = session?.user.id || undefined;
  const id = params.id;
  const [post, categories] = await Promise.all([
    fetchPostById(id),
    fetchCategories(),
  ]);

  if (!post) {
    notFound();
  }
  if (userId !== post.user_id) {
    throw new Error();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Posts", href: "/posts" },
          {
            label: "Edit Post",
            href: `/posts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditPosteForm post={post} categories={categories} />
    </main>
  );
}
