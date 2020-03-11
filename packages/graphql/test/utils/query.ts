import test from "ava";
import { buildQueryDefs } from "../../src/utils/query";
import { v4 as uuid } from "uuid";

const nameConfig = {
	get: {
		all: "getPosts",
		byId: "getPost",
		meta: "PostsMeta"
	},
	post: {
		create: "createPost",
		update: "updatePost",
		delete: "removePost"
	},
	input: {
		filterFields: "PostsFilterFields",
		filter: "PostsFilter",
		create: "PostInitInput",
		update: "PostUpdateInput"
	},
	internalFields: {
		created: "created",
		updated: "updated"
	}
};

const QUERY_DEF = `type Query {
  getPosts(pagination: Pagination, sorting: Sorting, filter: PostsFilter): [Post]!
  getPost(id: ID!): Post
  PostsMeta: MetaData!
}`;

function range(n, start = 1) {
	return new Array(n).fill(Boolean).map((x, i) => i + start);
}

test("buildQueryDefs() should build a query definition", t => {
	const data = {
		posts: range(2).map(x => ({
			id: uuid(),
			title: `Item ${x}`,
			body: `Item ${x}, content`,
			user_id: uuid()
		}))
	};
	const expected = QUERY_DEF;
	const actual = buildQueryDefs(data, { posts: nameConfig }, []);
	t.is(actual, expected);
});
