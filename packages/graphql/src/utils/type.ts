import { isFloat, isBoolean, isNumber, isDate, isPlainObject, isString } from "@phony/utils";

export const types: {[key: string]: string} = {
	id: "ID",
	date: "String",
	string: "String",
	float: "Float",
	integer: "Int",
	boolean: "Boolean",
	object: "JSON"
};

export function getType(value: any): string {
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
	/* istanbul ignore else */
	if (isPlainObject(value)) {
		return "object";
	}
}
export function getSchemaType(value: any): string {
	return types[getType(value)];
}

export function buildTypeDefStr(type: string, name: string, defs: string[]): string {
	return `${type} ${name} {\n  ${defs.join("\n  ").trim()}\n}`;
}
