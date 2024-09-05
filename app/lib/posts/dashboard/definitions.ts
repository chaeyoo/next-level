export type PostReport = {
	post_id: string;
	title: string;
	view_count: number;
	like_count: number;
};

export type CategoryReport = {
	category_id: string;
	category_name: string;
	post_count: number;
	total_views: number;
	total_likes: number;
};

export type CommentReport = {
	post_id: string;
	title: string;
	comment_count: number;
	unique_commenters: number;
};
