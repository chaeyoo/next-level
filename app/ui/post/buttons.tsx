import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreatePost() {
	return (
		<Link
			href="/posts/create"
			className="flex h-10 items-center rounded-lg bg-yellow-600 px-4 text-sm font-medium text-white transition-colors hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
		>
			<span className="hidden md:block">Create Post</span>{" "}
			<PlusIcon className="h-5 md:ml-4" />
		</Link>
	);
}
