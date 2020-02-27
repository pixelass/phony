import { filePath, flags } from "./phonyql-cli";
import phonyGraphql from "@phony/graphql";
import flush from "@phony/graphql/flush";
import exportSchema from "@phony/graphql/export";
import * as path from "path";
import { existsSync } from "fs";
import { AnyFlags } from "meow";

async function phonyql(filePath: string, flags: AnyFlags): Promise<boolean | void> {
	const cwd = process.cwd();
	const resolvedPath = path.resolve(cwd, filePath);
	const port = flags.port;
	const database = flags.database;
	const databasePath = path.resolve(cwd, database as string);
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
		return await exportSchema(require(resolvedPath), schemaPath);
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
		return await phonyGraphql(require(databasePath), databasePath, port as string);
	}
}

phonyql(filePath, flags);
