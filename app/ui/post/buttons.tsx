import { deletePost } from "@/app/lib/posts/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreatePost() {
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

export function UpdatePost({ id }: { id: string }) {
	return (
		<Link
			href={`/posts/${id}/edit`}
			className="rounded-md border p-2 hover:bg-gray-100"
		>
			<PencilIcon className="w-5" />
		</Link>
	);
}

export function DeletePost({ id }: { id: string }) {
	const deletePostWithId = deletePost.bind(null, id);
	return (
		<>
			<form action={deletePostWithId}>
				<button className="rounded-md border p-2 hover:bg-gray-100">
					<span className="sr-only">Delete</span>
					<TrashIcon className="w-5" />
				</button>
			</form>
		</>
	);
}
