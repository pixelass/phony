import { buildRelations } from "./relations";
import { capital, plural, singular, isPlural, isCapital, isId, withRequired } from "@phony/utils";
import { Database, Entry, NameConfig, NameMap, PonyConfig } from "./types";
import { buildQueryDefs } from "./query";
import { buildMutationDefs } from "./mutation";
import { isArray, isPlainObject } from "is-what";
import { getType, types } from "./type";
import { buildRoot } from "./root";
import { META_DATA_TYPE, PAGINATION_TYPE, SORTING_TYPE } from "../constants";

export function buildName(str: string, collectionName: string): string | false {
	const match = str.match(/(.*)\[([nN]ames?)](.*)/);
	const _collectionName = singular(collectionName).toLowerCase();
	if (match) {
		const [, prefix, name, suffix] = match;
		const c = isCapital(name);
		const p = isPlural(name);
		return `${prefix}${(p ? plural : singular)(
			c ? capital(_collectionName) : _collectionName
		)}${suffix}`;
	}
	return false;
}

export function createNames(name: string, config: NameConfig): NameConfig {
	return Object.entries(config).reduce(
		(current, [key, value]) => ({
			...current,
			[key]: Object.entries(value).reduce((_current, [_key, _value]) => {
				return {
					..._current,
					[_key]: buildName(_value as string, name)
				};
			}, {})
		}),
		{}
	) as NameConfig;
}

export function buildTypeNames(data: Database, config): NameMap {
	return Object.entries(data).reduce(
		(current, [key]) => ({ ...current, [key]: createNames(key, config) }),
		{}
	);
}

function withArray(str, bool) {
	return bool ? `[${str}!]` : str;
}

function withoutArray(str) {
	return str.replace(/\[(.*)!]/, "$1");
}

function buildNames(obj, name = "") {
	return obj
		? Object.entries(obj).reduce((current, [key, value]) => {
				const __typename = name + capital(singular(key));
				const isArr = isArray(value);
				const v = isArr ? value[0] : value;
				if (isCapital(key)) {
					return { ...current, [key]: singular(key) };
				}
				return {
					...current,
					[key]:
						v && isPlainObject(v)
							? {
									__typename: withArray(__typename, isArr),
									...buildNames(v, __typename)
							  }
							: withArray(types[isId(key) ? "id" : getType(v)], isArr)
				};
		  }, {})
		: false;
}

function buildTypeDef(
	{ all, required }: { all: Entry; required: Entry },
	name: string,
	typeDefs: string[]
): string[] {
	const type = Object.entries(all).reduce((current, [key, value]) => {
		if (isCapital(key)) {
			return `${current}\n  ${key}: ${withArray(
				singular(key),
				isPlural(key)
			)}!`;
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
