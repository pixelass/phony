import * as path from "path";
import cloneDeep from "lodash.clonedeep";
import { CWD } from "./constants";
import { buildRelations } from "./utils/relations";
import { exportSchema as exportPhonySchema } from "./utils/schema";
import { Database } from "./utils/types";
import { buildTypeDefs } from "./utils/type-builders";

async function exportSchema(
	json: Database,
	schemaPath: string
) {
	const rawData = cloneDeep(json);
	const data = buildRelations(rawData);
	const typeDefs = buildTypeDefs(data);
	await exportPhonySchema(typeDefs, path.resolve(CWD, schemaPath));
}

export default exportSchema;
