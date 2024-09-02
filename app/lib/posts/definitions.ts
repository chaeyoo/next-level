export type PostsTable = {
	id: string;
	user_id: string;
	user_name: string;
	category_id: number;
	category_name: string;
	title: string;
	content: string;
	view_count: number;
	created_at: string;
	updated_at: string;
	comment_count: number;
	like_id: string;
	is_liked: boolean;
	like_count: number;
};
