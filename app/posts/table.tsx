import { fetchFilteredPosts } from "../lib/posts/data";
import { PostsTable } from "../lib/posts/definitions";
import dayjs from "dayjs";
import { CategoryField } from "../lib/definitions";
import { DeletePost, UpdatePost } from "../ui/post/buttons";
import Link from "next/link";
import { auth } from "@/auth";
export default async function PostTable({
	query,
	currentPage,
	category,
}: {
	query: string;
	currentPage: number;
	category: CategoryField[];
}) {
	const posts = await fetchFilteredPosts(query, currentPage);

	function getCategoryName(categoryId: number) {
		return category.find((cat) => cat.id === categoryId)?.name;
	}
	const session = await auth();
	const userId = session?.user.id || undefined;
	return (
		<div className="mt-6 flow-root">
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-gray-50 p-2 md:pt-0">
					<div className="md:hidden">
						{posts?.map((post: PostsTable) => (
							<div
								key={post.id}
								className="mb-2 w-full rounded-md bg-white p-4"
							>
								<div className="flex items-center justify-between  pb-4">
									<div>
										<div className="mb-2 flex items-center">
											<Link
												href={`/posts/${post.id}`}
												className="hover:underline"
											>
												{post.title}
											</Link>
											<span className="ml-3">{`(${post.comment_count})`}</span>
										</div>
										<p className="text-sm text-gray-500">{post.user_name}</p>
									</div>
									{getCategoryName(post.category_id)}
								</div>
								{userId === post.user_id && (
									<div className="flex w-full items-center justify-between pt-4">
										<div className="flex justify-end gap-2">
											<UpdatePost id={post.id} />
											<DeletePost id={post.id} />
										</div>
									</div>
								)}
							</div>
						))}
					</div>
					<table className="hidden min-w-full text-gray-900 md:table">
						<thead className="rounded-lg text-left text-sm font-normal">
							<tr>
								<th
									scope="col"
									className="px-4 py-5 font-medium sm:pl-6 text-center"
								>
									카테고리
								</th>
								<th scope="col" className="px-3 py-5 font-medium text-center">
									제목
								</th>
								<th scope="col" className="px-3 py-5 font-medium text-center">
									작성자
								</th>
								<th scope="col" className="px-3 py-5 font-medium text-center">
									작성일
								</th>
								<th scope="col" className="px-3 py-5 font-medium text-center">
									조회수
								</th>
								<th scope="col" className="relative py-3 pl-6 pr-3">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{posts?.map((post: PostsTable) => (
								<tr
									key={post.id}
									className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
								>
									<td className="py-3 pl-6 pr-3 text-center">
										{getCategoryName(post.category_id)}
									</td>

									<td className=" px-3 py-3 text-center">
										<Link
											href={`/posts/${post.id}`}
											className="hover:underline"
										>
											{post.title}
										</Link>
										<span className="ml-3">{`(${post.comment_count})`}</span>
									</td>
									<td className=" px-3 py-3 text-center">{post.user_name}</td>

									<td className=" px-3 py-3 text-center">
										{dayjs(post.created_at).add(9, 'hours').format("YYYY-MM-DD HH:mm:ss")}
									</td>
									<td className=" px-3 py-3 text-center">{post.view_count}</td>
									<td className=" py-3 pl-6 pr-3">
										{userId === post.user_id && (
											<div className="flex justify-end gap-3">
												<UpdatePost id={post.id} />
												<DeletePost id={post.id} />
											</div>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
