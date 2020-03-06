import { writeFile, stringify } from "@phony/utils";
import {Database, PonyConfig} from "./utils/types";
import path from "path";
import {CWD} from "./constants";

async function flushData(data: Database, config: PonyConfig): Promise<boolean> {
	const filePath = path.resolve(CWD, config.database);
	return writeFile(filePath, stringify(data))
		.then(() => {
			console.log(`database successfully flushed at ${filePath}`);
			return true;
		})
		.catch(error => {
			console.error(error);
			return false;
		});
}

export default flushData;
