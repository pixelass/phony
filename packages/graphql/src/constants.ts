import {__, ID_SUFFIX} from "@phony/utils";

export const TYPES = {
	id: "ID",
	object: "JSON",
	json: "JSON",
	string: "String",
	date: "String",
	int: "Int",
	float: "Float"
};

export const ID_SUFFIX_PATTERN = new RegExp(`${ID_SUFFIX}$`);

export const META_DATA_TYPE = `type MetaData {
${__}count: Int!
}`;

export const PAGINATION_TYPE = `input Pagination {
${__}page: Int
${__}pageSize: Int
${__}sorting: Sorting
}

input Sorting {
${__}field: String!
${__}order: SortOrder!
}

enum SortOrder {
${__}asc
${__}desc
}`;

export const CWD = process.cwd();
