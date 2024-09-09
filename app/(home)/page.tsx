import { Suspense } from "react";
import { CardsSkeleton, CommentListSkeleton } from "@/app/ui/skeletons";
import { fetchCategoryReport } from "../lib/posts/dashboard/data";
import ChartSkeleton from "../ui/post/chart-skeleton";
import StackedBarChartWrapper from "../ui/post/dashboard/category-report";

import CardWrapper from "../ui/post/dashboard/card-wrapper";
import CommentList from "../ui/post/dashboard/comment-list";
import { lusitana } from "../ui/fonts";
import Link from "next/link";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

export default async function Page() {
	const categoryStats = await fetchCategoryReport();

	return (
		<div className="p-4">
			<Link
				href={"/posts"}
				className=" mb-4 flex underline text-xl justify-end"
			>
				게시판으로 가기
				<ArrowRightCircleIcon className="w-5" />
			</Link>
			<h2
				className={`${lusitana.className} mb-4 text-xl md:text-2xl font-semibold`}
			>
				이번주 게시판 통계
			</h2>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<Suspense fallback={<CardsSkeleton />}>
					<CardWrapper />
				</Suspense>
			</div>

			<div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
				<Suspense fallback={<CommentListSkeleton />}>
					<CommentList />
				</Suspense>
				<Suspense fallback={<ChartSkeleton />}>
					<StackedBarChartWrapper data={categoryStats} />
				</Suspense>
			</div>
		</div>
	);
}
