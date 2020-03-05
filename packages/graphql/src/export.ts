import path from "path";
import { writeFile } from "@phony/utils";
import { Database, PonyConfig } from "./utils/types";
import { build } from "./utils/schema";
import { CWD } from "./constants";

async function exportSchema(json: Database, config: PonyConfig): Promise<boolean> {
	const { schema } = await build(json, config);
	const filePath = path.resolve(CWD, config.schema);
	return await writeFile(filePath, schema)
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
