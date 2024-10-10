"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { CategoryField } from "@/app/lib/definitions";
import Link from "next/link";
import { UserCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createPost, State } from "@/app/lib/posts/actions";
import Image from "next/image";
import EditorComponent from "../editor";

function EditorSkeleton() {
	return (
		<div className="animate-pulse">
			<div className="h-96 bg-gray-100 rounded w-full flex justify-center items-center">
				<Image src="/loading.gif" alt="로딩 중" width={24} height={24} />
			</div>
		</div>
	);
}

export default function Form({ categories }: { categories: CategoryField[] }) {
	const initialState: State = { message: null, errors: {} };
	const [state, formAction] = useActionState(createPost, initialState);
	const [content, setContent] = useState("");
	const [isEditorLoading, setIsEditorLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsEditorLoading(false);
		}, 2500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<form action={formAction}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6 h-full pb-5">
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
							defaultValue=""
							aria-describedby="categoryId-error"
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
							<input
								id="content"
								name="content"
								onChange={() => {}}
								value={content}
								className="hidden peer w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							/>
							<div className="relative">
								<div
									className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
										isEditorLoading
											? "opacity-100 z-10"
											: "opacity-0 z-0 pointer-events-none"
									}`}
								>
									<EditorSkeleton />
								</div>
								<div className="w-full h-full">
									<EditorComponent
										setContent={setContent}
										initContent={"<p></p>"}
									/>
								</div>
							</div>
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
				{!isEditorLoading ? (
					<>
						<Link
							href="/posts"
							className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
						>
							취소
						</Link>
						<Button type="submit">발행하기</Button>
					</>
				) : null}
			</div>
		</form>
	);
}
