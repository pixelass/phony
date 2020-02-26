import phonyGraphql from "@phony/graphql";
import flush from "@phony/graphql/flush";
import exportSchema from "@phony/graphql/export";
import * as path from "path";
import { existsSync } from "fs";

async function phony(cmd, filePath, flags) {
	const cwd = process.cwd();
	const resolvedPath = path.resolve(cwd, filePath);
	const port = flags.port;
	const database = flags.database;
	if (cmd === "graphql") {
		const databasePath = path.resolve(cwd, database);
		const shouldServe = !flags["no-serve"];
		const shouldFlush = !!flags.flush;
		const shouldInit = !!flags.init;
		const shouldExport = !!flags.export;
		const schemaPath = flags.schema;
		if (shouldInit || shouldFlush) {
			if (!existsSync(databasePath) || shouldFlush) {
				await flush(require(resolvedPath), databasePath);
			}
		}
		if (shouldExport) {
			await exportSchema(require(resolvedPath), schemaPath);
		}
		if (shouldServe) {
			if (!existsSync(databasePath)) {
				console.error(
					new Error(
						"Database does not exist. Please make sure it has been created or pass the --init flag"
					)
				);
				return;
			}
			await phonyGraphql(require(databasePath), databasePath, port);
		}
	}
}

export default phony;
