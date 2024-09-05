import { fetchPostsReport } from "@/app/lib/posts/dashboard/data";

export default async function PostReport() {
    const data = await fetchPostsReport();
    console.log(data);
	return <>포스트통계</>;
}
