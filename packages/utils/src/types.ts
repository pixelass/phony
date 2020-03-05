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

export interface Entry {
	[key: string]: string | number;
}

export interface Item extends Entry {
	id: string;
}

export type Collection = Item[];

export interface Fields {
	[key: string]: string;
}

export interface Filter {
	fields?: Fields;
	q?: string;
}

export type ItemComparison = (item: Item) => boolean;
