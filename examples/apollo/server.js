const express = require("express");
const next = require("next");
const {default: nextI18NextMiddleware} = require("next-i18next/middleware");


const nextI18next = require("./i18n");
const port = process.env.PORT || 3000;
const app = next({dev: process.env.NODE_ENV !== "production"});
const handle = app.getRequestHandler();

const handler = (req, res) => handle(req, res);

(async () => {
	await app.prepare();
	const server = express();
	server.use(nextI18NextMiddleware(nextI18next));
	server.get("*", handler);
	await server.listen(port);
	console.log(`Client ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
