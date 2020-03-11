import { getNameVariants } from "./name";
import {Database, DatabaseCollection, NameConfig} from "./types";
import { buildTypeDefStr, getSchemaType, types } from "./type";
import { isId, isRelative, withRequired } from "@phony/utils";

export function buildInputDef(
	name: string,
	collection: DatabaseCollection,
	internalFields: string[],
	allOptional = false
) {
	const [first, second] = collection;
	const allFields = Object.keys(first).filter(key => !isId(key) && !internalFields.includes(key));
	const requiredFields = Object.keys(second).filter(
		key => !isId(key) && !internalFields.includes(key)
	);
	return buildTypeDefStr(
		"input",
		name,
		allFields.map(field => {
			return `${field}: ${
				isId(field) || isRelative(field) ? types.id : getSchemaType(first[field])
			}${withRequired(
				requiredFields.includes(field) && (!allOptional || isRelative(field))
			)}`;
		})
	);
}

export function buildMutationDefs(
	data: Database,
	typeNames: { [key: string]: NameConfig },
	queryConfig: NameConfig,
	phonyInputs: string[]
) {
	const mutationDefs = [];
	const internalFields = Object.values(queryConfig.internalFields);
	Object.entries(data).forEach(([key, collection]) => {
		const names = getNameVariants(key);
		const localNames = typeNames[key];
		phonyInputs.push(buildInputDef(localNames.input.create, collection, internalFields));
		phonyInputs.push(buildInputDef(localNames.input.update, collection, internalFields, true));
		mutationDefs.push(
			`${localNames.post.create}(input: ${localNames.input.create}!): ${names.singular.capital}!`
		);
		mutationDefs.push(
			`${localNames.post.update}(id: ID!, input: ${localNames.input.update}!): ${names.singular.capital}!`
		);
		mutationDefs.push(`${localNames.post.delete}(id: ID!): Boolean!\n`);
	});
	return buildTypeDefStr("type", "Mutation", mutationDefs);
}
