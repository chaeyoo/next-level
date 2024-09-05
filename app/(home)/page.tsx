import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import {
	LatestInvoicesSkeleton,
	RevenueChartSkeleton,
	CardsSkeleton,
} from "@/app/ui/skeletons";
import PostReport from "../ui/post/dashboard/post-report";
import CategoryReport from "../ui/post/dashboard/category-report";
import CommentReport from "../ui/post/dashboard/comment-report";

export default async function Page() {
	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				게시판 대시보드
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<Suspense fallback={<CardsSkeleton />}>
					<PostReport />
				</Suspense>
			</div>
			<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
				<Suspense fallback={<RevenueChartSkeleton />}>
					<CategoryReport />
				</Suspense>

				<Suspense fallback={<LatestInvoicesSkeleton />}>
					<CommentReport />
				</Suspense>
			</div>
		</main>
	);
}
