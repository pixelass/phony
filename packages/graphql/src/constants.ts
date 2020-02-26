export const TYPES = {
	id: "ID",
	object: "JSON",
	json: "JSON",
	string: "String",
	date: "String",
	int: "Int",
	float: "Float"
};

export const POTENTIALLY_REQUIRED = [
	"id",
	"title",
	"name",
	"body",
	"content",
	"email",
	"mobile",
	"telephone",
	"phone",
	"tel"
];
export const ID = "ID";
export const ID_SUFFIX = "_${ID}";
export const ID_SUFFIX_PATTERN = new RegExp(`${ID_SUFFIX}$`);
export const NL = "\n";
export const __ = "\t";
export const NL__ = `${NL}${__}`;
export const META_DATA_TYPE = `type MetaData {${NL__}count: Int!${NL}}`;
export const CWD = process.cwd();
