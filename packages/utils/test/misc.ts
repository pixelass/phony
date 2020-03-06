import test from "ava";
import { isId, isRelative, withRequired, withArray, withoutArray } from "../src/misc";

test("isId() returns `true` for 'id'", t => {
	t.true(isId("id"));
});

test("isId() returns `false` for anything but 'id'", t => {
	t.false(isId("_id"));
	t.false(isId("id_"));
	t.false(isId("kid"));
	t.false(isId("identity"));
	t.false(isId("foo_id"));
	t.false(isId("foo"));
	t.false(isId("I do"));
	t.false(isId("iD"));
	t.false(isId("Id"));
	t.false(isId("ID"));
});

test("isRelative() returns `true` for '_id' matches", t => {
	t.true(isRelative("_id"));
	t.true(isRelative("foo_id"));
	t.true(isRelative("anything_id"));
});

test("isRelative() returns `false` for anything but '_id' matches", t => {
	t.false(isRelative("id"));
	t.false(isRelative("foo"));
	t.false(isRelative("foo_ID"));
	t.false(isRelative("foo_Id"));
	t.false(isRelative("foo_iD"));
});

test("withRequired() returns '!' for `true` and '' for `false`", t => {
	t.is(withRequired(true), "!");
	t.is(withRequired(!0), "!");
	t.is(withRequired(false), "");
	t.is(withRequired(!!0), "");
});

test("withArray() returns a string in brackets ([string!]) if `true`", t => {
	t.is(withArray("Foo", true), "[Foo!]");
	t.is(withArray("Foo", !0), "[Foo!]");
});

test("withArray() returns the input string if `false`", t => {
	t.is(withArray("Foo", false), "Foo");
	t.is(withArray("Foo", !!0), "Foo");
});

test("withoutArray() returns removes the brackets ([string!]) from a string", t => {
	t.is(withoutArray("[Foo!]"), "Foo");
	t.is(withoutArray("Foo"), "Foo");
});
