export interface DatabaseEntry {
	[key: string]: any;
}

export interface Database {
	[key: string]: DatabaseEntry[];
}

export interface Names {
	getAll: string;
	getById: string;
	meta: string;
	create: string;
	update: string;
	del: string;
}

export type RootFunction = (...args: any[]) => any;

export interface Root {
	[key: string]: RootFunction;
}

export type SortField = string;
export type SortOrder = "asc" | "desc";

export interface Sorting {
	field: SortField;
	order: SortOrder;
}

export interface Pagination {
	page: number;
	pageSize: number;
}
