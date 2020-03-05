const path = require("path");
const createGraphqlServer = require("@phony/graphql");
const flush = require("@phony/graphql/flush");
const config = require("./phony.config");

(async function start() {
	const db = require(path.resolve(process.cwd(), config.database));
	await flush(db, config);
	createGraphqlServer(db, config);
})();
