import createGraphqlServer from "@phony/graphql";
import flush from "@phony/graphql/dist/flush";
import * as path from "path";
import * as fs from "fs";

async function phony(cmd, filePath, flags) {
	const cwd = process.cwd();
	const resolvedPath = path.resolve(cwd, filePath);
	const port = flags.port;
	if (cmd === "graphql") {
		const dbPath = path.resolve(cwd, "db.json");
		const shouldExport = !!flags["export-schema"];
		const shouldServe = !flags["no-serve"];
		const shouldFlush = !!flags.flush;
		const shouldInit = !!flags.init;
		if (shouldInit) {
			if(!fs.existsSync(dbPath)) {
				const db = require(resolvedPath);
				await flush(db, dbPath);
			}
		} else {
			if(!fs.existsSync(dbPath) && shouldServe) {
				console.error(new Error("Database does not exist. Please make sure it has been created or pass the --init flag"))
			}
		}
		if (shouldServe || shouldExport) {
			if(!fs.existsSync(dbPath) && shouldServe) {
				console.error(new Error("Database does not exist. Please make sure it has been created or pass the --init flag"))
				return
			}
			const db = require(dbPath);
			createGraphqlServer(db, {serve: shouldServe, "export": shouldExport, filePath: dbPath}, port)
		} else if (shouldFlush) {
			const db = require(resolvedPath);
			await flush(db, dbPath);
		}
	}
}

export default phony
