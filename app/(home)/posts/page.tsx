import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import { CreatePost } from "@/app/ui/post/buttons";
import { fetchPostsPages } from "@/app/lib/posts/data";
import PostTable from "./table";
import { fetchCategories } from "@/app/lib/data";
import Filter from "@/app/ui/post/Filter";

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		categoryId?: string;
		query?: string;
		page?: string;
	};
}) {
	const categoryId = searchParams?.categoryId || "";
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;

	const [totalPages, category] = await Promise.all([
		await fetchPostsPages(categoryId, query),
		await fetchCategories(),
	]);
	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`${lusitana.className} text-2xl`}>Posts</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<Filter categories={category} />
				<Search placeholder="제목 또는 작성자 검색" />
				<CreatePost />
			</div>
			<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
				<PostTable
					categoryId={categoryId}
					query={query}
					currentPage={currentPage}
					category={category}
				/>
			</Suspense>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	);
}
