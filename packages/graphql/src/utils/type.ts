import { isFloat, isBoolean, isNumber, isDate, isPlainObject, isString } from "@phony/utils";

export const types = {
	id: "ID",
	date: "String",
	string: "String",
	float: "Float",
	integer: "Int",
	boolean: "Boolean",
	object: "JSON"
};

export function getType(value) {
	if (isDate(value)) {
		return "date";
	}
	if (isNumber(value)) {
		return isFloat(value) ? "float" : "integer";
	}
	if (isString(value)) {
		return "string";
	}
	if (isBoolean(value)) {
		return "boolean";
	}
	if (isPlainObject(value)) {
		return "object";
	}
}
export function getSchemaType(value) {
	return types[getType(value)];
}

export function buildTypeDef(type: string, name: string, defs: string[]) {
	return `${type} ${name} {\n  ${defs.join("\n  ").trim()}\n}`;
}
