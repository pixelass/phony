import { isId, isNumber, isRelative } from "@phony/utils";
import { buildTypeDef, getSchemaType, types } from "./type";
import { isString } from "is-what";

export const operators = ["gt", "gte", "lte", "lt"];

export function buildFilterFields(key, fields, name, phonyInputs = []) {
	const typeDef = buildTypeDef(
		"input",
		name,
		Object.entries(fields)
			.map(([name, value]) => {
				const hasId = isId(name) || isRelative(name);
				if (isNumber(value) && !hasId) {
					const type = getSchemaType(value);
					return [
						`${name}: ${type}`,
						...operators.map(suffix => `${name}_${suffix}: ${type}`)
					].join("\n  ");
				}
				if (hasId) {
					return `${name}: ${types.id}`;
				}
				if (isString(value)) {
					return `${name}: ${types.string}`;
				}
				return "";
			})
			.filter(Boolean)
	);
	phonyInputs.push(typeDef);
}

export function buildFilter(key, fields, names, phonyInputs = []) {
	buildFilterFields(key, fields, names.input.filterFields, phonyInputs);
	const typeDef = buildTypeDef("input", names.input.filter, [
		"q: String",
		`fields: ${names.input.filterFields}`
	]);
	phonyInputs.push(typeDef);
}
