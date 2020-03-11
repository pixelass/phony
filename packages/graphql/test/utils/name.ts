import test from "ava";
import { getNameVariants, buildName, createNames, buildTypeNames, buildNames } from "../../src/utils/name";
import {types} from "../../src/utils/type";

test("getNameVariants() should build capitalized, singular and plural versions of the name", t => {
	const { singular, plural } = getNameVariants("user");
	t.is(singular.lower, "user");
	t.is(singular.capital, "User");
	t.is(plural.lower, "users");
	t.is(plural.capital, "Users");
});

test("getNameVariants() allows plural as input", t => {
	const { singular, plural } = getNameVariants("users");
	t.is(singular.lower, "user");
	t.is(singular.capital, "User");
	t.is(plural.lower, "users");
	t.is(plural.capital, "Users");
});

test("getNameVariants() allows capital as input", t => {
	const { singular, plural } = getNameVariants("User");
	t.is(singular.lower, "user");
	t.is(singular.capital, "User");
	t.is(plural.lower, "users");
	t.is(plural.capital, "Users");
});

test("getNameVariants() allows plural capital as input", t => {
	const { singular, plural } = getNameVariants("Users");
	t.is(singular.lower, "user");
	t.is(singular.capital, "User");
	t.is(plural.lower, "users");
	t.is(plural.capital, "Users");
});

test("buildName() should build a name from [[nN]ames?]", t => {
	const name = buildName("get_[name]", "users");
	t.is(name, "get_user");
});

test("buildName() should build a plural name from [[nN]ames?]", t => {
	const name = buildName("get_[names]", "users");
	t.is(name, "get_users");
});

test("buildName() should build a capital name from [[nN]ames?]", t => {
	const name = buildName("get_[Name]", "users");
	t.is(name, "get_User");
});

test("buildName() should build a capital plural name from [[nN]ames?]", t => {
	const name = buildName("get_[Names]", "users");
	t.is(name, "get_Users");
});

test("buildName() should allow a suffix", t => {
	const name = buildName("get_[Names]_", "users");
	t.is(name, "get_Users_");
});

const nameConfig = {
	get: {
		all: "get[Names]",
		byId: "get[Name]",
		meta: "[Names]Meta"
	},
	post: {
		create: "create[Name]",
		update: "update[Name]",
		delete: "remove[Name]"
	},
	input: {
		filterFields: "[Names]FilterFields",
		filter: "[Names]Filter",
		create: "[Name]InitInput",
		update: "[Name]UpdateInput"
	},
	internalFields: {}
};

const nameConfigExpected = {
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
	}
};

const data = {
	posts: [
		{
			id: 1,
			views: 123,
			rating: 2.5,
			title: "Lorem Ipsum",
			user_id: 123,
		},
		{
			id: 2,
			views: 234,
			rating: 4.2,
			title: "Sic Dolor amet",
			user_id: 456,
		}
	]
};


test("createNames() should build a nameConfig", t => {
	const names = createNames("post", nameConfig);
	Object.entries(names).forEach(([fieldKey, fieldValue]) => {
		Object.entries(fieldValue).forEach(([nameKey, nameValue]) => {
			const expected = nameConfigExpected[fieldKey][nameKey];
			t.is(nameValue, expected);
		})
	});
});


test("buildTypeNames() should build a nameMap", t => {
	const {posts} = buildTypeNames(data, nameConfig);
	Object.entries(posts).forEach(([fieldKey, fieldValue]) => {
		Object.entries(fieldValue).forEach(([nameKey, nameValue]) => {
			const expected = nameConfigExpected[fieldKey][nameKey];
			t.is(nameValue, expected);
		})
	});
});

test("buildNames() should build types of nested props", t => {
	const names = buildNames(data.posts[0], "");
	t.is(names.id, types.id);
	t.is(names.user_id, types.id);
	t.is(names.views, types.integer);
	t.is(names.rating, types.float);
	t.is(names.title, types.string);
});
