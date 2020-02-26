import * as path from "path";
import { buildSchema } from "graphql";
import cloneDeep from "lodash.clonedeep";
import { CWD } from "./constants";
import { buildRoot } from "./utils/root";
import { buildRelations } from "./utils/relations";
import phonyServe from "./utils/serve";
import { Database } from "./utils/types";
import { buildTypeDefs } from "./utils/type-builders";

async function serve(json: Database, databasePath: string, port: string | number = 1337): Promise<void> {
	const rawData = cloneDeep(json);
	const data = buildRelations(rawData);
	const typeDefs = buildTypeDefs(data);
	await phonyServe(
		{
			schema: buildSchema(typeDefs),
			rootValue: buildRoot(data, rawData, path.resolve(CWD, databasePath))
		},
		port
	);
}

export default serve;
