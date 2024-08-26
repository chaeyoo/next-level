"use client";
import { useActionState } from "react";
import { CategoryField } from "@/app/lib/definitions";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createInvoice, State } from "@/app/lib/invoices/actoins";

export default function Form({ categories }: { categories: CategoryField[] }) {
	const initialState: State = { message: null, errors: {} };
	const [state, formAction] = useActionState(createInvoice, initialState);
	return (
		<form action={formAction}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				{/* 카테고리 선택 */}
				<div className="mb-4">
					<label htmlFor="customer" className="mb-2 block text-sm font-medium">
						카테고리 선택
					</label>
					<div className="relative">
						<select
							id="customer"
							name="customerId"
							className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							defaultValue=""
							aria-describedby="customer-error"
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
					<div id="customer-error" aria-live="polite" aria-atomic="true">
						{state.errors?.customerId &&
							state.errors.customerId.map((error: string) => (
								<p className="mt-2 text-sm text-red-500" key={error}>
									{error}
								</p>
							))}
					</div>
				</div>
			</div>
			<div className="mt-6 flex justify-end gap-4">
				<Link
					href="/dashboard/invoices"
					className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
				>
					Cancel
				</Link>
				<Button type="submit">발행하기</Button>
			</div>
		</form>
	);
}
