const createGraphqlServer = require("@phony/graphql");
const flush = require("@phony/graphql/dist/flush");
const path = require("path");
const db = require("./db");

async function start() {
	const filePath = path.resolve(__dirname, "db.json");
	await flush(db, filePath);
	createGraphqlServer(db, filePath, 3001);
}

start();
