import { isId, isNumber, isRelative, isString, OPERATORS } from "@phony/utils";
import { buildTypeDefStr, getSchemaType, types } from "./type";
import {Entry, NameConfig} from "./types";

export function buildFilterFields(fields: Entry, name: string, phonyInputs: string[] = []): string {
	const typeDef = buildTypeDefStr(
		"input",
		name,
		Object.entries(fields)
			.map(([name, value]) => {
				const hasId = isId(name) || isRelative(name);
				if (isNumber(value) && !hasId) {
					const type = getSchemaType(value);
					return [
						`${name}: ${type}`,
						...Object.values(OPERATORS).map(suffix => `${name}_${suffix}: ${type}`)
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
	return typeDef;
}

export function buildFilter(fields: Entry, names: NameConfig, phonyInputs: string[] = []): string {
	buildFilterFields(fields, names.input.filterFields, phonyInputs);
	const typeDef = buildTypeDefStr("input", names.input.filter, [
		"q: String",
		`fields: ${names.input.filterFields}`
	]);
	phonyInputs.push(typeDef);
	return typeDef;
}
