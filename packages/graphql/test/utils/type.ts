import test from "ava";
import {types, getType, getSchemaType, buildTypeDefStr} from "../../src/utils/type";

test("getType() should determine the type of an datatype", t => {
	t.is(getType(""), "string");
	t.is(getType("a"), "string");
	t.is(getType(1), "integer");
	t.is(getType(0.1), "float");
	t.is(getType(false), "boolean");
	t.is(getType(new Date()), "date");
	t.is(getType({a: "A"}), "object");
});

test("getSchemaType() should declare the type of an datatype", t => {
	t.is(getSchemaType(""), types.string);
	t.is(getSchemaType("a"), types.string);
	t.is(getSchemaType(1), types.integer);
	t.is(getSchemaType(0.1), types.float);
	t.is(getSchemaType(false), types.boolean);
	t.is(getSchemaType(new Date()), types.date);
	t.is(getSchemaType({a: "A"}), types.object);
});

const TYPEDEF_STR = `type Foo {
  foo: String
}`;
test("buildTypeDefStr() should build a graphql typedef string", t => {
	t.is(buildTypeDefStr("type", "Foo", ["foo: String"]), TYPEDEF_STR);
});
