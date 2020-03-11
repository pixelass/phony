import test from "ava";
import { buildInputDef, buildMutationDefs } from "../../src/utils/mutation";
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

const INPUT_DEF_1 = `input MyInput {
  title: String!
  body: String!
}`;

const INPUT_DEF_2 = `input MyInput {
  title: String
  body: String
}`;

const INPUT_DEF_3 = `input MyInput {
  title: String
  body: String
  user_id: ID!
}`;

const MUTATION_DEF = `type Mutation {
  createPost(input: PostInitInput!): Post!
  updatePost(id: ID!, input: PostUpdateInput!): Post!
  removePost(id: ID!): Boolean!
}`;

function range(n, start = 1) {
	return new Array(n).fill(Boolean).map((x, i) => i + start);
}

test("buildInputDef() should build an Input definition", t => {
	const collection = range(2).map(x => ({
		id: uuid(),
		title: `Item ${x}`,
		body: `Item ${x}, content`
	}));
	const expected = INPUT_DEF_1;
	const actual = buildInputDef("MyInput", collection, []);
	t.is(actual, expected);
});

test("buildInputDef() can build all fields optional", t => {
	const collection = range(2).map(x => ({
		id: uuid(),
		title: `Item ${x}`,
		body: `Item ${x}, content`
	}));
	const expected = INPUT_DEF_2;
	const actual = buildInputDef("MyInput", collection, [], true);
	t.is(actual, expected);
});

test("buildInputDef() always makes id relations required", t => {
	const collection = range(2).map(x => ({
		id: uuid(),
		title: `Item ${x}`,
		body: `Item ${x}, content`,
		user_id: uuid()
	}));
	const expected = INPUT_DEF_3;
	const actual = buildInputDef("MyInput", collection, [], true);
	t.is(actual, expected);
});

test("buildMutationDefs() should build a mutation definition", t => {
	const data = {
		posts: range(2).map(x => ({
			id: uuid(),
			title: `Item ${x}`,
			body: `Item ${x}, content`,
			user_id: uuid()
		}))
	};
	const expected = MUTATION_DEF;
	const actual = buildMutationDefs(data, { posts: nameConfig }, nameConfig, []);
	t.is(actual, expected);
});
