import {writeFile, prettyJSON} from "@phony/utils";
import {Database} from "./utils/types";

async function flushData(data: Database, filePath: string): Promise<boolean> {
	return writeFile(filePath, prettyJSON(data))
		.then(() => {
			console.log(`database successfully flushed at ${filePath}`);
			return true
		})
		.catch(error => {
			console.error(error);
			return false;
		});
}

export default flushData;
