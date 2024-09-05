import { fetchCategoryReport } from "@/app/lib/posts/dashboard/data";

export default async function CategoryReport() {
	const data = await fetchCategoryReport();
	console.log(data);
	return <>카테고리통계</>;
}
