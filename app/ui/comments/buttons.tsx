import { deleteComment } from "@/app/lib/comments/action";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateComment() {
	return (
		<Link
			href="/posts/create"
			className="flex h-10 items-center rounded-lg bg-slate-500 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
		>
			<span className="hidden md:block">글쓰기</span>{" "}
			<PlusIcon className="h-5 md:ml-4" />
		</Link>
	);
}

export function DeleteComment({ id, postId }: { id: string; postId: string }) {
	const deleteCommentWithId = deleteComment.bind(null, id, postId);
	return (
		<>
			<form action={deleteCommentWithId}>
				<button className="text-gray-500 hover:text-red-500">
					<TrashIcon className="w-5" />
				</button>
			</form>
		</>
	);
}
