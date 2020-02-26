import {prettyJSON, writeFile} from "@phony/utils";

export async function update(data, filePath) {
	await writeFile(filePath, prettyJSON(data));
	console.log(`database successfully updated at ${filePath}`);
}
