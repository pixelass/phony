import {capitalize, pluralize} from "@phony/utils";

export function getNames(key) {
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
