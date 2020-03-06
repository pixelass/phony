import test from "ava";
import {isCapital, capital} from "../src/string";

test("isCapital() returns `true` for capital strings", t => {
	t.true(isCapital("Hello"));
	t.true(isCapital("HELLO"));
	t.true(isCapital("HellO"));
});

test("isCapital() returns `false` for non capital strings", t => {
	t.false(isCapital("hello"));
	t.false(isCapital("hELLO"));
	t.false(isCapital("hellO"));
});

test("capital() returns a capital string", t => {
	t.is(capital("hello"), "Hello");
	t.is(capital("Hello"), "Hello");
	t.is(capital("hellO"), "HellO");
	t.is(capital("hELLO"), "HELLO");
});

test("capital() ignores non letters", t => {
	t.is(capital("_hello"), "_hello");
	t.is(capital("0hello"), "0hello");
});
