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
import {
	fetchCategoryReport,
	fetchCommentsReport,
	fetchPostsReport,
} from "../lib/posts/dashboard/data";
import ChartSkeleton from "../ui/post/chart-skeleton";
import GroupedBarChartWrapper from "../ui/post/dashboard/post-report";
import StackedBarChartWrapper from "../ui/post/dashboard/category-report";
import BubbleChartWrapper from "../ui/post/dashboard/comment-report";

export default async function Page() {
	const postStats = await fetchPostsReport();
	const categoryStats = await fetchCategoryReport();
	const commentStats = await fetchCommentsReport();

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">대시보드</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Suspense fallback={<ChartSkeleton />}>
					<GroupedBarChartWrapper data={postStats} />
				</Suspense>
				<Suspense fallback={<ChartSkeleton />}>
					<StackedBarChartWrapper data={categoryStats} />
				</Suspense>
				<Suspense fallback={<ChartSkeleton />}>
					<BubbleChartWrapper data={commentStats} />
				</Suspense>
			</div>
		</div>
	);
}
