import {capitalize, pluralize} from "@phony/utils";
import {Names} from "./types";

export function getNames(key): Names {
	const cap = capitalize(key);
	const sing = pluralize.singular(cap);
	const create = `create${sing}`;
	const update = `update${sing}`;
	const del = `delete${sing}`;
	const getAll = `get${cap}`;
	const getById = pluralize.singular(getAll);
	const meta = `_${getAll}Meta`;
	return { getAll, getById, meta, create, update, del };
}
