import { fetchCommentsReport } from "@/app/lib/posts/dashboard/data";

export default async function CommentReport() {
	const data = await fetchCommentsReport();
	console.log(data);
	return <>코멘트 통계</>;
}
