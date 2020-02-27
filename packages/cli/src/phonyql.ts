import { filePath, flags } from "./phonyql-cli";
import phonyGraphql from "@phony/graphql";
import flush from "@phony/graphql/flush";
import exportSchema from "@phony/graphql/export";
import * as path from "path";
import { existsSync } from "fs";
import { AnyFlags } from "meow";

async function phonyql(filePath: string, flags: AnyFlags): Promise<boolean> {
	const cwd = process.cwd();
	const resolvedPath = path.resolve(cwd, filePath);
	const { port, database, schema } = flags;
	const shouldServe = !flags["no-serve"];
	const shouldFlush = !!flags.flush;
	const shouldInit = !!flags.init;
	const shouldExport = !!flags.export;
	const databasePath = path.resolve(cwd, database as string);
	const schemaPath = path.resolve(cwd, schema as string);
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
			return false;
		}
		return await phonyGraphql(require(databasePath), databasePath, port as string);
	}
}

phonyql(filePath, flags).then(r => r).catch(error => {
	console.error(error);
});
