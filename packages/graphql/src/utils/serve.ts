import createServer from "@phony/server";
import graphqlHTTP from "express-graphql";
import { GraphQLSchema } from "graphql";

interface ServeOptions {
	schema: GraphQLSchema;
	rootValue: unknown;
}
export default async function serve(
	{ schema, rootValue }: ServeOptions,
	port: string | number = 1337
): Promise<boolean> {
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
