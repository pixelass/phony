import {prettyJSON, writeFile} from "@phony/utils";
import {Database} from "./types";

export async function update(data: Database, filePath: string): Promise<boolean> {
	return await writeFile(filePath, prettyJSON(data)).then(() => {
		console.log(`database successfully updated at ${filePath}`);
		return true
	})
		.catch(error => {
			console.error(error);
			return false;
		});
}
