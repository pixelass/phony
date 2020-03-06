import test from "ava";
import {isFloat, isInteger} from "../src/number";

test("isFloat() returns `true` for floats", t => {
	t.true(isFloat(0.1));
	t.true(isFloat(0.234));
	t.true(isFloat(1.2));
	t.true(isFloat(-1.2));
});

test("isFloat() returns `false` for integers", t => {
	t.false(isFloat(0));
	t.false(isFloat(234));
	t.false(isFloat(1));
	t.false(isFloat(1.0));
	t.false(isFloat(0.0));
	t.false(isFloat(-1));
	t.false(isFloat(-1.0));
});


test("isInteger() returns `true` for integers", t => {
	t.true(isInteger(0));
	t.true(isInteger(234));
	t.true(isInteger(1));
	t.true(isInteger(1.0));
	t.true(isInteger(0.0));
	t.true(isInteger(-1));
	t.true(isInteger(-1.0));
});

test("isFloat() returns `false` for floats", t => {
	t.false(isInteger(0.1));
	t.false(isInteger(0.234));
	t.false(isInteger(1.2));
	t.false(isInteger(-1.2));
});
