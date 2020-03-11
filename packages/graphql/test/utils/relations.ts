import test from "ava";
import {buildRelations} from "../../src/utils/relations";

const data = {
	posts: [
		{
			id: 1,
			title: "Lorem Ipsum",
			user_id: 123,
		},
		{
			id: 2,
			title: "Sic Dolor amet",
			user_id: 456,
		}
	],
	users: [
		{
			id: 123,
			name: "John Doe",
		},
		{
			id: 456,
			name: "Jane Doe",
		}
	],
	comments: [
		{
			id: 987,
			post_id: 1,
			body: "Consectetur adipiscing elit",
		},
		{
			id: 995,
			post_id: 1,
			body: "Nam molestie pellentesque dui",
		}
	]
};

test("buildRelations should connect two collections", t => {
	const {users: [user], posts: [post], comments: [comment]} = buildRelations(data);
	t.true(user.hasOwnProperty("Posts"));
	t.is(user.Posts.length, 1);
	t.true(post.hasOwnProperty("User"));
	t.true(post.hasOwnProperty("Comments"));
	t.is(post.Comments.length, 2);
	t.true(comment.hasOwnProperty("Post"));
});

test("buildRelations should build a circular data structure", t => {
	const {users: [user], posts: [post], comments: [comment]} = buildRelations(data);
	t.is(user.Posts[0], post);
	t.is(user.Posts[0].User, user);
	t.is(post.User, user);
	t.is(post.Comments[0], comment);
	t.is(post.Comments[0].Post, post);
	t.is(comment.Post, post);
});
