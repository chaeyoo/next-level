import clsx from "clsx";
import { lusitana } from "../../fonts";
import { fetchCommentsReport } from "@/app/lib/posts/dashboard/data";
import Link from "next/link";
export default async function CommentList() {
	const popularComments5 = await fetchCommentsReport();
	return (
		<div className="flex w-full flex-col">
			<h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl font-semibold`}>
				댓글 많은 게시글
			</h2>
			<div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4 overflow-auto">
				<div className="bg-white px-6">
					{popularComments5.map((comment, i) => {
						return (
							<div
								key={comment.post_id}
								className={clsx(
									"flex flex-row items-center justify-between py-4",
									{
										"border-t": i !== 0,
									}
								)}
							>
								<div className="flex items-center">
									<div className="mx-5 text-xl font-bold">{i + 1}위</div>
									<div className="min-w-0">
										<Link
											href={`/posts/${comment.post_id}`}
											className="truncate text-sm font-semibold md:text-base"
										>
											{comment.title}
										</Link>
										<p className="hidden text-sm text-gray-500 sm:block">
											{comment.comment_count}개 (총 {comment.unique_commenters}
											명의 댓글)
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
