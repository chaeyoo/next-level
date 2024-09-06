export type PostStat = {
	posts_cnt: number;
	likes_cnt: string;
	total_views: string;
	authors_cnt: string;
};

export type CategoryStat = {
	category_id: number;
	category_name: string;
	post_count: string;
	total_views: string;
	total_likes: string;
};

export type CommentStat = {
	post_id: number;
	title: string;
	comment_count: string;
	unique_commenters: string;
};
