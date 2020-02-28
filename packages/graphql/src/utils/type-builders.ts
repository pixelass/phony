import {
	capitalize,
	isCapitalized,
	isDate,
	isFloat,
	isNumber,
	isObject,
	isString,
	isId,
	embrace,
	pluralize,
	isRelative,
	withRequired,
	isArray,
	arrToIndentString,
	NL__
} from "@phony/utils";
import { META_DATA_TYPE, PAGINATION_TYPE, TYPES } from "../constants";
import { Database } from "./types";
import { getNames } from "./names";
import omit from "lodash.omit";
import uniq from "lodash.uniq";

export function buildTypeDef(type: string, name: string, defs: string[]) {
	return `${type} ${name} ${embrace(arrToIndentString(defs))}`;
}

export function buildPhonyType(
	{ __first, __second, ...content }: { [key: string]: any },
	name: string,
	phonyTypes: string[]
) {
	const typeName = capitalize(name);
	const data = __first && __second ? __first : content;
	phonyTypes.push(
		buildTypeDef(
			"type",
			typeName,
			Object.entries(data).map(
				([key, value]) =>
					`${key}: ${
						pluralize.isPlural(key)
							? `[${buildTypes(value, key, phonyTypes)}]`
							: buildTypes(value, key, phonyTypes)
					}${withRequired(__second && Object.keys(__second).includes(key))}`
			)
		)
	);
	return typeName;
}

export function buildPhonyInput(
	{ __first, __second, ...content }: any,
	name: string,
	phonyTypes: string[]
) {
	const typeName = pluralize.singular(capitalize(name));
	const data = __first && __second ? __first : content;
	phonyTypes.push(
		buildTypeDef(
			"input",
			`${typeName}Input`,
			Object.entries(data).map(
				([key, value]) =>
					`${key}: ${buildTypes(value, key, phonyTypes, buildPhonyInput)}${withRequired(
						withRequired(__second && Object.keys(__second).includes(key)) ||
							isRelative(key)
					)}`
			)
		)
	);
	return typeName;
}

export function buildPhonyUpdateInput(content: any, name: string, phonyTypes: string[]) {
	const typeName = pluralize.singular(capitalize(name));
	phonyTypes.push(
		buildTypeDef(
			"input",
			`${typeName}UpdateInput`,
			Object.entries(content).map(
				([key, value]) =>
					`${key}: ${buildTypes(
						value,
						key,
						phonyTypes,
						buildPhonyUpdateInput
					)}${withRequired(isId(key))}`
			)
		)
	);
	return typeName;
}

export function buildTypes(
	value: any,
	key: string,
	phonyTypes: string[] = [],
	buildPhony = buildPhonyType
) {
	if (isId(key) || isRelative(key)) {
		return TYPES.id;
	}
	if (isCapitalized(key)) {
		if (pluralize.isPlural(key)) {
			return pluralize.singular(key);
		}
		return key;
	}
	if (isString(value)) {
		return TYPES.string;
	}
	if (isDate(value)) {
		return TYPES.date;
	}
	if (isNumber(value)) {
		return isFloat(value as number) ? TYPES.float : TYPES.int;
	}
	if (isArray(value)) {
		const [first, second] = value as any[];
		if (isObject(first) && isObject(second)) {
			return buildTypes(
				{ __first: first, __second: second },
				pluralize.singular(key),
				phonyTypes
			);
		}
		return buildTypes(first, pluralize.singular(key), phonyTypes);
	}
	if (isObject(value)) {
		return buildPhony(value, key, phonyTypes);
	}
}

export function buildTypeDefs(json: Database) {
	const phonyTypes = [];
	const phonyInputs = [];
	const queryDefs = Object.entries(json).reduce((current, [key, value]) => {
		const type = buildTypes(value, key, phonyTypes);
		const names = getNames(key);
		const getAll = `${names.getAll}(pagination: Pagination): [${type}]`;
		const getById = `${names.getById}(id: ID!): ${type}`;
		const meta = `${names.meta}: MetaData`;
		return `${current}${NL__}${getAll}${NL__}${getById}${NL__}${meta}`;
	}, "");
	const mutDefs = Object.entries(json).reduce((current, [key]) => {
		const collection = json[key];
		const names = getNames(key);
		const [first, second] = collection;
		const removables = ["date", "count", "created", "updated"];
		const removals = Object.keys(first).filter(
			x =>
				removables.includes(x) ||
				removables.filter(removable => x.endsWith(`_${removable}`)).length ||
				isCapitalized(x)
		);
		const initialProps = omit(first, ["id", ...removals.filter(x => !isRelative(x))]);
		const initialUpdateProps = omit(
			first,
			["id", ...Object.keys(first).map(x => (isRelative(x) ? x : null)), ...removals].filter(
				Boolean
			)
		);
		buildTypes({ __first: initialProps, __second: second }, key, phonyInputs, buildPhonyInput);
		buildTypes(initialUpdateProps, key, phonyInputs, buildPhonyUpdateInput);
		const type = buildTypes(first, key, []);
		const singularType = pluralize.singular(type);
		const create = `${names.create}(input: ${singularType}Input!): ${singularType}`;
		const update = `${names.update}(id: ID!, input: ${singularType}UpdateInput!): ${singularType}`;
		const del = `${names.del}(id: ID!): Boolean`;
		return `${current}\n  ${create}\n  ${update}\n  ${del}`;
	}, "");
	const query = `type Query {${queryDefs}\n}`;
	const mut = `type Mutation {${mutDefs}\n}`;
	return [
		query,
		mut,
		PAGINATION_TYPE,
		META_DATA_TYPE,
		...uniq(phonyTypes),
		...uniq(phonyInputs)
	].join("\n\n");
}
