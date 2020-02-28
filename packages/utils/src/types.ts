export type SortField = string;
export type SortOrder = "asc"|"desc";

export interface Sorting {
	field: SortField
	order: SortOrder;
}

export interface Pagination {
	page: number;
	pageSize: number;
	sorting: Sorting
}

export interface Entry {
	[key: string]: string | number
}

export type Collection = Entry[]

export interface Fields {
	[key: string]: string
}

export interface Filter {
	fields?: Fields;
	q?: string;
}
