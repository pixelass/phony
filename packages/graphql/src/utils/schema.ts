import {writeFile} from "@phony/utils";

export async function exportSchema(typeDefs, schemaFile): Promise<boolean> {
	return writeFile(schemaFile, typeDefs).then(() => {
		console.log(`schema has been exported to ${schemaFile}`);
		return true
	}).catch(error => {
		console.error(error);
		return false
	});
}
