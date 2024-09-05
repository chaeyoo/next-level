"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { CategoryField } from "@/app/lib/definitions";

export default function Filter({
	categories,
}: {
	categories: CategoryField[];
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	const optArr = [{ id: "", name: "전체" }, ...categories];
	const handleSearch = (categoryId: any) => {
		console.log(categoryId);
		const params = new URLSearchParams(searchParams);
		params.set("page", "1");
		if (categoryId) {
			params.set("categoryId", categoryId);
		} else {
			params.delete("categoryId");
		}
		replace(`${pathname}?${params.toString()}`);
	};

	return (
		<select
			id="categoryId"
			name="categoryId"
			className="peer block cursor-pointer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
			defaultValue=""
			aria-describedby="categoryId-error"
			onChange={(e) => {
				handleSearch(e.target.value);
			}}
		>
			<option value="" disabled>
				카테고리 선택
			</option>
			{optArr.map((category) => (
				<option key={category.id} value={category.id}>
					{category.name}
				</option>
			))}
		</select>
	);
}
