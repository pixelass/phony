import {
	capital,
	plural,
	singular,
	isCapital,
	isPlural,
	withArray,
	isId,
	isRelative
} from "@phony/utils";
import { isArray, isPlainObject } from "is-what";
import { getType, types } from "./type";
import { Database, DatabaseEntry, Entry, NameConfig, NameMap } from "./types";

export function getNameVariants(input) {
	const name = singular(input.toLowerCase());
	const name_ = plural(name);
	const Name = capital(name);
	const Name_ = capital(name_);
	return {
		singular: {
			lower: name,
			capital: Name
		},
		plural: {
			lower: name_,
			capital: Name_
		}
	};
}

export function buildName(str: string, collectionName: string): string | false {
	const match = str.match(/(.*)\[([nN]ames?)](.*)/);
	const _collectionName = singular(collectionName).toLowerCase();
	/* istanbul ignore else */
	if (match) {
		const [, prefix, name, suffix] = match;
		const c = isCapital(name);
		const p = isPlural(name);
		return `${prefix}${(p ? plural : singular)(
			c ? capital(_collectionName) : _collectionName
		)}${suffix}`;
	}
	/* istanbul ignore next */
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

export function buildTypeNames(data: Database, config: NameConfig): NameMap {
	return Object.entries(data).reduce(
		(current, [key]) => ({ ...current, [key]: createNames(key, config) }),
		{}
	);
}

export function buildNames(obj: DatabaseEntry, name: string = ""): Entry {
	return Object.entries(obj).reduce((current, [key, value]) => {
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
							...buildNames(v as DatabaseEntry, __typename)
					  }
					: withArray(types[isId(key) || isRelative(key) ? "id" : getType(v)], isArr)
		};
	}, {});
}
