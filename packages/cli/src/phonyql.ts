import { filePath, flags } from "./phonyql-cli";
import phonyGraphql from "@phony/graphql";
import flush from "@phony/graphql/flush";
import exportSchema from "@phony/graphql/export";
import * as path from "path";
import { existsSync } from "fs";
import { AnyFlags } from "meow";
import explorer from "./explorer";

function merge(...o) {
	return o.reduce(
		(current, next) => ({
			...current,
			...Object.entries(next)
				.filter(([, value]) => value !== undefined)
				.reduce((current, [key, value]) => ({ ...current, [key]: value }), {})
		}),
		{}
	);
}

const defaultConfig = {
	queryConfig: {
		get: {
			byId: "[Name]",
			all: "all[Name]s",
			meta: "_all[Names]Meta"
		},
		post: {
			create: "create[Name]",
			update: "update[Name]",
			delete: "remove[Name]"
		},
		input: {
			filter: "[Names]Filter",
			filterFields: "[Names]FilterFields",
			create: "[Name]InitInput",
			update: "[Name]UpdateInput"
		},
		internalFields: {
			created: "created",
			updated: "updated",
			views: "views"
		}
	},
	schema: "schema.graphql",
	input: "db.js",
	database: "db.json",
	port: 1337
};

async function phonyql(filePath: string, flags: AnyFlags): Promise<boolean> {
	const cwd = process.cwd();
	const { port, database, schema } = flags;
	const { config = {}} = await explorer();
	const mergedConfig = merge(defaultConfig, config, { port, database, schema });
	const actualFilePath = filePath || config.input;
	if (!actualFilePath) {
		console.error(`no input file available, expected string, got ${actualFilePath}`);
	}
	const resolvedPath = path.resolve(cwd, actualFilePath);
	const shouldServe = !flags["no-serve"];
	const shouldFlush = !!flags.flush;
	const shouldInit = !!flags.init;
	const shouldExport = !!flags.export;
	const databasePath = path.resolve(cwd, mergedConfig.database as string);
	if (!existsSync(resolvedPath)) {
		console.error(`File ${resolvedPath} does not exist.`);
	}
	const db = require(resolvedPath);
	if (shouldExport) {
		return await exportSchema(db, mergedConfig);
	}
	if (shouldInit || shouldFlush) {
		if (!existsSync(databasePath) || shouldFlush) {
			await flush(db, mergedConfig);
		}
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
		return await phonyGraphql(db, mergedConfig);
	}
}

phonyql(filePath, flags)
	.then(r => r)
	.catch(error => {
		console.error(error);
	});
