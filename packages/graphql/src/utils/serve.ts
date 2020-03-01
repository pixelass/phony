import createServer from "@phony/server";
import graphqlHTTP from "express-graphql";

export default async function serve({schema, rootValue}, port: string | number = 1337): Promise<boolean> {
	const app = createServer();
	app.get(
		"*",
		graphqlHTTP({
			schema,
			rootValue,
			graphiql: true
		})
	);
	app.post(
		"*",
		graphqlHTTP({
			schema,
			rootValue,
			graphiql: false
		})
	);
	await app.listen(port);
	console.log(`Client ready on http://localhost:${port}`); // eslint-disable-line no-console
	return true;
}
