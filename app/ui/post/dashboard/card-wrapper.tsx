import Card from "./card";
import { fetchPostsReport } from "../../../lib/posts/dashboard/data";

export default async function CardWrapper() {
	const data = await fetchPostsReport();
	return (
		<>
			<Card
				title="작성된 개시물"
				value={data.posts_cnt + "개"}
				type="collected"
			/>
			<Card title="좋아요 개수" value={data.likes_cnt + "개"} type="pending" />
			<Card title="조회수" value={data.total_views + "회"} type="invoices" />
			<Card
				title="글쓴 사람"
				value={data.authors_cnt + "명"}
				type="customers"
			/>
		</>
	);
}
