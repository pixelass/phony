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
