const createGraphqlServer = require("@phony/graphql");
const flush = require("@phony/graphql/flush");
const db = require("./db");
const config = require("./phony.config");

(async function start() {
	await flush(db, config);
	createGraphqlServer(db, config);
})();
