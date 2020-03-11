import {
	capital,
	isCapital,
	isPlural,
	singular,
	withArray,
	withoutArray,
	withRequired
} from "@phony/utils";
import { isPlainObject } from "is-what";
import { META_DATA_TYPE, PAGINATION_TYPE, SORTING_TYPE } from "../constants";
import { buildMutationDefs } from "./mutation";
import { buildQueryDefs } from "./query";
import { buildRelations } from "./relations";
import { buildRoot } from "./root";
import { Database, Entry, PonyConfig } from "./types";
import { buildNames, buildTypeNames } from "./name";

export function buildTypeDef(
	{ all, required }: { all: Entry; required: Entry },
	name: string,
	typeDefs: string[]
): string[] {
	const type = Object.entries(all).reduce((current, [key, value]) => {
		if (isCapital(key)) {
			return `${current}\n  ${key}: ${withArray(singular(key), isPlural(key))}!`;
		}
		if (value && isPlainObject(value)) {
			const { __typename, ...rest } = value;
			buildTypeDef({ all: rest, required: required && required[key] }, __typename, typeDefs);
			return `${current}\n  ${key}: ${__typename}${withRequired(!required || required[key])}`;
		}
		return `${current}\n  ${key}: ${value}${withRequired(!required || required[key])}`;
	}, "");
	typeDefs.push(`type ${withoutArray(name)} {${type}\n}`);
	return typeDefs;
}

export function buildTypeDefs(data: Database): string {
	const typeDefs = [];
	Object.entries(data).forEach(([key, value]) => {
		const name = capital(singular(key));
		const [first, second] = value;
		const names = buildNames(first, name);
		const _names = buildNames(second, name) || names;
		if (!names || !_names) {
			throw Error("names || _names is false. Expected an object");
		}
		buildTypeDef({ all: names, required: _names }, name, typeDefs);
	});
	return typeDefs.join("\n\n");
}

export async function build(
	data: Database,
	config: PonyConfig
): Promise<{ schema: string; rootValue: unknown }> {
	const fullData = buildRelations(data);
	const phonyInputs = [];
	const names = buildTypeNames(data, config.queryConfig);
	const typeDefs = buildTypeDefs(fullData);
	const queryDefs = buildQueryDefs(data, names, phonyInputs);
	const mutationDefs = buildMutationDefs(data, names, config.queryConfig, phonyInputs);
	const rootValue = buildRoot(fullData, data, names, config);
	const schema = [
		queryDefs,
		mutationDefs,
		typeDefs,
		META_DATA_TYPE,
		SORTING_TYPE,
		PAGINATION_TYPE,
		...phonyInputs
	].join("\n\n");
	return { schema, rootValue };
}
