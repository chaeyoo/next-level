"use client";

import { CategoryField } from "@/app/lib/definitions";
import { PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { PostsTable } from "@/app/lib/posts/definitions";
import { State, updatePost } from "@/app/lib/posts/actions";
import EditorComponent from "../editor";

export default function EditPosteForm({
	post,
	categories,
}: {
	post: PostsTable;
	categories: CategoryField[];
}) {
	const initialState: State = { message: null, errors: {} };
	const updatePostWithId = updatePost.bind(null, post.id);
	const [state, formAction] = useActionState(updatePostWithId, initialState);
	const [content, setContent] = useState(post.content);

	return (
		<form action={formAction}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				<div className="mb-4">
					<label
						htmlFor="categoryId"
						className="mb-2 block text-sm font-medium"
					>
						카테고리
					</label>
					<div className="relative">
						<select
							id="categoryId"
							name="categoryId"
							className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							defaultValue={post.category_id}
						>
							<option value="" disabled>
								카테고리 선택
							</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
						<UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
					</div>
					<div id="categoryId-error" aria-live="polite" aria-atomic="true">
						{state.errors?.categoryId &&
							state.errors.categoryId.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))}
					</div>
				</div>

				{/* Invoice Amount */}
				<div className="mb-4">
					<label htmlFor="title" className="mb-2 block text-sm font-medium">
						제목
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="title"
								name="title"
								type="text"
								placeholder="제목을 입력해주세요."
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								defaultValue={post.title}
								required
							/>
							<PencilSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div id="title-error" aria-live="polite" aria-atomic="true">
						{state.errors?.title &&
							state.errors.title.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))}
					</div>
				</div>

				<div className="mb-4">
					<label htmlFor="title" className="mb-2 block text-sm font-medium">
						내용
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<textarea
								id="content"
								name="content"
								value={content}
								defaultValue={post.content}
								placeholder="내용을 입력해주세요."
								className="peer hidden w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
								required
							/>
							<EditorComponent
								setContent={setContent}
								initContent={post.content}
							/>
						</div>
					</div>
					<div id="content-error" aria-live="polite" aria-atomic="true">
						{state.errors?.content &&
							state.errors.content.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))}
					</div>
				</div>
			</div>
			<div className="mt-6 flex justify-end gap-4">
				<Link
					href={`/posts/${post.id}`}
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					취소
				</Link>
				<button
					className="flex h-10 items-center rounded-lg bg-slate-900 text-white px-4 text-sm font-medium transition-colors hover:bg-slate-700"
					type="submit"
				>
					수정
				</button>
			</div>
		</form>
	);
}
