import { getNameVariants } from "./name";
import { isCapitalized } from "@phony/utils";
import omit from "lodash.omit";
import { Database, NameMap } from "./types";
import { buildFilter } from "./filter";
import { buildTypeDef } from "./type";

export function buildQueryDefs(data: Database, typeNames: NameMap, phonyInputs: string[]) {
	const queryDefs = [];
	Object.entries(data).forEach(([key, collection]) => {
		const names = getNameVariants(key);
		const localNames = typeNames[key];
		const [first] = collection;
		const removals = Object.keys(first).filter(isCapitalized);
		buildFilter(key, omit(first, removals), localNames, phonyInputs);
		queryDefs.push(
			`${localNames.get.all}(pagination: Pagination, sorting: Sorting, filter: ${localNames.input.filter}): [${names.singular.capital}]!`
		);
		queryDefs.push(`${localNames.get.byId}(id: ID!): ${names.singular.capital}`);
		queryDefs.push(`${localNames.get.meta}: MetaData!\n`);
	});
	return buildTypeDef("type", "Query", queryDefs);
}
