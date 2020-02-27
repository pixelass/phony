import cloneDeep from "lodash.clonedeep";
import { buildRelations } from "./utils/relations";
import { Database } from "./utils/types";
import { buildTypeDefs } from "./utils/type-builders";
import { writeFile } from "@phony/utils";

async function exportSchema(json: Database, filePath: string): Promise<boolean> {
	const rawData = cloneDeep(json);
	const data = buildRelations(rawData);
	const typeDefs = buildTypeDefs(data);
	return await writeFile(filePath, typeDefs)
		.then(() => {
			console.log(`schema has been exported to ${filePath}`);
			return true;
		})
		.catch(error => {
			console.error(error);
			return false;
		});
}

export default exportSchema;
