const createGraphqlServer = require("@phony/graphql");
const flush = require("@phony/graphql/dist/flush");
const path = require("path");
const fs = require("fs");
const db = require("./db");

async function start() {
	const filePath = path.resolve(__dirname, "db.json");
	await flush(db, filePath);
	fs.readFile(filePath, "utf-8", (err, content) => {
		createGraphqlServer(JSON.parse(content), 3001);
	} );
}

start();
