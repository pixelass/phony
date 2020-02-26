import {writeFile} from "@phony/utils";

export async function exportSchema(typeDefs, schemaFile) {
	await writeFile(schemaFile, typeDefs);
	console.log(`schema has been exported to ${schemaFile}`);
}
