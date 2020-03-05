import { buildSchema } from "graphql";
import phonyServe from "./utils/serve";
import { Database, PonyConfig } from "./utils/types";
import { build } from "./utils/schema";

async function serve(json: Database, config: PonyConfig): Promise<boolean> {
	const { schema, rootValue } = await build(json, config);
	return await phonyServe(
		{
			schema: buildSchema(schema),
			rootValue
		},
		config.port
	);
}

export default serve;
