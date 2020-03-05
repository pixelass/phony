import { Collection, Filter, Pagination, Sorting } from "./types";
import chunk from "lodash.chunk";
import { isString } from "is-what";

export function hasMatch(a: number | string, b: string): RegExpMatchArray {
	return `${a}`.toLowerCase().match(b.toLowerCase());
}

export function compare(a: number, b: number, c: string): boolean {
	switch (c) {
		case "gt":
			return a > b;
		case "gte":
			return a >= b;
		case "lte":
			return a <= b;
		case "lt":
			return a < b;
		default:
			return false;
	}
}

export function sortByField(collection: Collection, field: string) {
	return collection.sort((a, b) => {
		const fieldA = isString(a[field]) ? (a[field] as string).toLowerCase() : a[field];
		const fieldB = isString(b[field]) ? (b[field] as string).toLowerCase() : b[field];
		if (fieldA < fieldB) {
			return -1;
		} else if (fieldA > fieldB) {
			return 1;
		} else {
			return 0;
		}
	});
}

export function withSorting(collection: Collection, sorting?: Sorting) {
	return sorting
		? sorting.order === "desc"
			? sortByField(collection, sorting.field).reverse()
			: sortByField(collection, sorting.field)
		: collection;
}

export function withPagination(collection: Collection, pagination?: Pagination) {
	return pagination ? chunk(collection, pagination.pageSize)[pagination.page] : collection;
}

export function withFilter(collection: Collection, filter?: Filter) {
	return filter
		? collection.filter(item => {
				const { length } = Object.entries(item).filter(([key, value]) => {
					if (filter.fields) {
						const [first] = Object.keys(filter.fields)
							.map(field => {
								const pattern = new RegExp(`(${key})_([lg]te?)`);
								return field.match(pattern);
							})
							.filter(Boolean);
						if (first) {
							const [fieldKey, , cond] = first;
							return compare(
								parseInt(`${value}`),
								parseInt(filter.fields[fieldKey]),
								cond
							);
						}
						if (key in filter.fields) {
							return hasMatch(value, filter.fields[key]);
						}
					}
					return !!filter.q && hasMatch(value, filter.q);
				});
				return !!length && (!filter.fields || length === Object.keys(filter.fields).length);
		  })
		: collection;
}
