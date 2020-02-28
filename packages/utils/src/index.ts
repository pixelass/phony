import chunk from "lodash.chunk";
import * as fs from "fs";
import * as path from "path";
import pify from "pify";
import mkdirp from "mkdirp";
export {
	isNull,
	isArray,
	isDate,
	isObject,
	isNumber,
	isNullOrUndefined,
	isUndefined,
	isBoolean,
	isPlainObject,
	isString,
	isEmptyString
} from "is-what";
import pluralize from "pluralize";
import { ID, ID_SUFFIX, NL, NL__, __ } from "./constants";
import { Collection, Filter, Pagination, Sorting } from "./types";
export { ID, ID_SUFFIX, NL, NL__, __ };

const { writeFile: writeFileP } = pify(fs);

export function writeFile(p: string, c: string) {
	const { dir } = path.parse(p);
	return mkdirp(dir)
		.then(() => writeFileP(p, c))
		.catch(error => {
			console.error(error);
		});
}

export { pluralize };

export function isRelated(id: number | string, name: string) {
	return item => `${item[name]}` === `${id}`;
}

export function isSame(id) {
	return isRelated(id, "id");
}

export function isFloat(n: number): boolean {
	return n === +n && n !== (n | 0);
}

export function isInteger(n: number): boolean {
	return n === +n && n === (n | 0);
}

export function isId(str) {
	return str === ID;
}

export function isRelative(str) {
	return str.endsWith(ID_SUFFIX);
}

export function isCapitalized(str) {
	return str[0] === str[0].toUpperCase();
}

export function withRequired(condition) {
	return condition ? "!" : "";
}

export function capitalize(str: string) {
	return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export function embrace(str) {
	return `{${NL__}${str}${NL}}`;
}

export function arrToIndentString(arr: string[]) {
	return arr.join(NL__);
}

export function prettyJSON(data, space = 4) {
	return JSON.stringify(data, null, space);
}

export function sortByField(field) {
	return (a, b) => {
		if (a[field] < b[field]) {
			return -1;
		} else if (a[field] > b[field]) {
			return 1;
		} else {
			return 0;
		}
	};
}

export function withSorting(collection: Collection, sorting: Sorting) {
	const sortedByField = collection.sort(sortByField(sorting.field));
	if (sorting.order === "desc") {
		return sortedByField.reverse();
	}
	return sortedByField;
}

export function getPage(collection: Collection, { page = 0, pageSize = 10 }: Partial<Pagination>) {
	return chunk(collection, pageSize)[page];
}

export function hasMatch(a: number | string, b: string) {
	return `${a}`.toLowerCase().match(b.toLowerCase());
}

export function compare(a: number, b: number, c: string) {
	switch(c) {
		case "gt":
			return a > b;
		case "gte":
			return a >= b;
		case "lte":
			return a <= b;
		case "lt":
			return a < b;
		default :
			return false;
	}
}


export function withFilter(collection: Collection, filter?: Filter) {
	if (!filter) {
		return collection;
	}
	const { fields, q } = filter;
	return collection.filter(item => {
		const nFields = fields ? Object.keys(fields).length : 0;
		const { length } = Object.entries(item).filter(([key, value]) => {
			const [first] = Object.keys(fields).map(field => {
				const pattern = new RegExp(`(${key})_([lg]te?)`);
				return field.match(pattern)
			}).filter(Boolean);
			if (first) {
				const [fieldKey, originalKey, cond] = first;
				return compare(parseInt(`${value}`), parseInt(fields[fieldKey]), cond)
			}
			if (!!fields && key in fields) {
				return hasMatch(value, fields[key]);
			}
			return !fields && hasMatch(value, q);
		});
		return !!length && (!fields || length === nFields);
	});
}
