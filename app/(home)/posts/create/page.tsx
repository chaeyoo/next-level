import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCategories } from "@/app/lib/data";
import Form from "@/app/ui/post/create-form";

export default async function Page() {
	const categories = await fetchCategories();

	return (
		<main>
			<Breadcrumbs
				breadcrumbs={[
					{ label: "Post", href: "/posts" },
					{
						label: "Create Posts",
						href: "/posts/create",
						active: true,
					},
				]}
			/>
			<Form categories={categories} />
		</main>
	);
}
