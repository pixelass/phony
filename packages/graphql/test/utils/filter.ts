import test from "ava";
import { buildFilter, buildFilterFields } from "../../src/utils/filter";

const nameConfig = {
	get: {
		all: "getAll",
		byId: "byId",
		meta: "meta"
	},
	post: {
		create: "create",
		update: "update",
		delete: "delete"
	},
	input: {
		filterFields: "MyFilterFields",
		filter: "MyFilter",
		create: "create",
		update: "update"
	},
	internalFields: {}
};

const FILTER_FIELDS = `input MyFilterFields {
  id: ID
  title: String
  views: Int
  views_gt: Int
  views_gte: Int
  views_lt: Int
  views_lte: Int
  user_id: ID
}`;

const FILTER = `input MyFilter {
  q: String
  fields: MyFilterFields
}`;

const fields = { id: 1, title: "foo", views: 10, user_id: 123 };

test("buildFilter() should build a filter", t => {
	const expected = FILTER;
	const actual = buildFilter(fields, nameConfig, []);
	t.is(actual, expected);
});

test("buildFilter() can build into a temp array", t => {
	const expected = FILTER;
	const actual = buildFilter(fields, nameConfig);
	t.is(actual, expected);
});

test("buildFilterFields() should build filter fields", t => {
	const expected = FILTER_FIELDS;
	const actual = buildFilterFields(fields, nameConfig.input.filterFields, []);
	t.is(actual, expected);
});

test("buildFilterFields() can build into a temp array", t => {
	const expected = FILTER_FIELDS;
	const actual = buildFilterFields(fields, nameConfig.input.filterFields);
	t.is(actual, expected);
});
