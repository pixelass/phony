import test from "ava";
import {
	hasMatch,
	compare,
	sortByField,
	withSorting,
	withPagination,
	withFilter
} from "../src/array";

function range(n, start = 1) {
	return new Array(n).fill(Boolean).map((x, i) => i + start);
}

function buildEntries() {
	const names = ["Jack", "Jane", "John", "Jeremy", "Jenny"];
	return [
		...range(names.length).map((x, i) => ({
			id: `a__${`${i}`.padStart(3, "0")}`,
			name: `${names[i]} Doe`,
			age: 20 + i
		})),
		...range(names.length).map((x, i) => ({
			id: `b__${`${i}`.padStart(3, "0")}`,
			name: `${names[i]} Simpson`,
			age: 30 + i
		})),
		...range(names.length).map((x, i) => ({
			id: `c__${`${i}`.padStart(3, "0")}`,
			name: `${names[i]} Griffin`,
			age: 40 + i
		})),
		...range(names.length).map((x, i) => ({
			id: `d__${`${i}`.padStart(3, "0")}`,
			name: `${names[i]} Smith`,
			age: 50 + i
		})),
		...range(names.length).map((x, i) => ({
			id: `e__${`${i}`.padStart(3, "0")}`,
			name: `${names[i]} Belcher`,
			age: 50 + i
		}))
	];
}

test("hasMatch() matches strings", t => {
	const expected = "ell";
	const [actual] = hasMatch("hello", "ell");
	t.is(actual, expected);
});

test("hasMatch() matches numbers", t => {
	const expected = "10";
	const [actual] = hasMatch(108, "10");
	t.is(actual, expected);
});

test("hasMatch() matches case insensitive", t => {
	const expected = "foob";
	const [actual] = hasMatch("FooBar", "fOOb");
	t.is(actual, expected);
});

test("compare() compares `a` and `b` with `lt` as `a < b", t => {
	t.true(compare(10, 20, "lt"));
	t.false(compare(20, 10, "lt"));
});

test("compare() compares `a` and `b` with `lte` as `a <= b", t => {
	t.true(compare(10, 20, "lte"));
	t.true(compare(20, 20, "lte"));
	t.false(compare(20, 10, "lte"));
});

test("compare() compares `a` and `b` with `gt` as `a > b", t => {
	t.true(compare(20, 10, "gt"));
	t.false(compare(10, 20, "gt"));
});

test("compare() compares `a` and `b` with `gte` as `a >= b", t => {
	t.true(compare(20, 10, "gte"));
	t.true(compare(20, 20, "gte"));
	t.false(compare(10, 20, "gte"));
});

test("sortByField() sorts arrays of objects by field", t => {
	const [a, b, c] = [
		{ a: 4, b: 18 },
		{ a: 10, b: 4 },
		{ a: 18, b: 10 }
	];
	const original = [b, c, a];
	t.is(sortByField(original, "a")[0], a);
	t.is(sortByField(original, "a")[1], b);
	t.is(sortByField(original, "b")[0], b);
	t.is(sortByField(original, "b")[1], c);
});

test("sortByField() sorts arrays of objects case-insensitive", t => {
	const [a, b, c] = [
		{ a: "AaA", b: "BbB" },
		{ a: "aBA", b: "bCB" },
		{ a: "AbB", b: "BcC" }
	];
	const original = [b, c, a];
	t.is(sortByField(original, "a")[0], a);
	t.is(sortByField(original, "a")[1], b);
});

test("withSorting() sorts arrays of objects with config", t => {
	const [a, b, c] = [
		{ a: "AaA", b: "BbB" },
		{ a: "aBA", b: "bCB" },
		{ a: "AbB", b: "BcC" }
	];
	const original = [b, c, a];
	t.is(withSorting(original, { field: "a", order: "asc" })[0], a);
	t.is(withSorting(original, { field: "a", order: "asc" })[1], b);
	t.is(withSorting(original, { field: "a", order: "desc" })[0], c);
	t.is(withSorting(original, { field: "a", order: "desc" })[1], b);
});

test("withSorting() returns the unsorted list if `sorting` is undefined", t => {
	const [a, b, c] = [
		{ a: "AaA", b: "BbB" },
		{ a: "aBA", b: "bCB" },
		{ a: "AbB", b: "BcC" }
	];

	const original = [b, c, a];
	t.is(withSorting(original)[0], b);
	t.is(withSorting(original)[1], c);
	t.is(withSorting(original)[2], a);
});

test("withPagination() returns n items of an array", t => {
	const original = range(20);
	t.is(withPagination(original, { page: 0, pageSize: 3 }).length, 3);
	t.is(withPagination(original, { page: 1, pageSize: 12 }).length, 8);
	t.is(withPagination(original, { page: 0, pageSize: 20 }).length, 20);
});

test("withPagination() returns `undefined` for unavailable pages", t => {
	const original = range(20);
	t.is(withPagination(original, { page: 3, pageSize: 20 }), undefined);
});

test("withPagination() returns all items if `paging is undefined", t => {
	const original = range(20);
	t.is(withPagination(original).length, 20);
});
test("withFilter() filters items by `q`", t => {
	const original = buildEntries();
	t.is(withFilter(original, { q: "Doe" }).length, 5);
	t.is(withFilter(original, { q: "Ja" }).length, 10);
	t.is(withFilter(original, { q: "J" }).length, original.length);
});

test("withFilter() filters items by `fields`", t => {
	const original = buildEntries();
	t.is(withFilter(original, { fields: {
			name: "Doe"
		} }).length, 5);
	t.is(withFilter(original, { fields: {
			name: "Ja"
		} }).length, 10);
	t.is(withFilter(original, { fields: {
			age: "20"
		} }).length, 1);
	t.is(withFilter(original, { fields: {
			age: "2"
		} }).length, 9);
});

test("withFilter() filters items by numeric `fields` with custom operators", t => {
	const original = buildEntries();
	t.is(withFilter(original, { fields: {
			age_lt: "24"
		} }).length, 4);
	t.is(withFilter(original, { fields: {
			age_lte: "24"
		} }).length, 5);
	t.is(withFilter(original, { fields: {
			age_gt: "24"
		} }).length, 20);
	t.is(withFilter(original, { fields: {
			age_gte: "24"
		} }).length, 21);
});

test("withFilter() filters items by multiple `fields`", t => {
	const original = buildEntries();
	t.is(withFilter(original, { fields: {
			name: "Doe",
			age: "24"
		} }).length, 1);
	t.is(withFilter(original, { fields: {
			name: "Doe",
			age_lt: "24"
		} }).length, 4);
});

test("withFilter() returns all items if `filter` is undefined", t => {
	const original = buildEntries();
	const actual = withFilter(original);
	t.is(actual.length, original.length);
});
