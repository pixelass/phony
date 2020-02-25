import * as fs from "fs";
import pify from "pify";
import createServer from "@phony/server";
import { buildSchema } from "graphql";
import graphqlHTTP from "express-graphql";
import pluralize from "pluralize";

const { readFile } = pify(fs);

async function readSchema(filePath) {
	return readFile(filePath, "utf8");
}

async function getSchema(filePath) {
	const typeDefs = await readSchema(filePath);
	console.log(typeDefs);
	return buildSchema(typeDefs);
}

interface DatabaseEntry {
	[key: string]: any;
}
interface Database {
	[key: string]: DatabaseEntry[];
}

const typeMap = {
	object: "JSON",
	string: "String",
	int: "Int",
	float: "Float"
};

function isFloat(n: number): boolean {
	return n === +n && n !== (n | 0);
}

function isInteger(n: number): boolean {
	return n === +n && n === (n | 0);
}

function capitalize(str: string) {
	const [first, ...rest] = str.split("");
	return `${first.toUpperCase()}${rest.join("")}`;
}

const TYPE_PREFIX = "Type_";
let typeCounter = 0;

const phonyTypes = [];

function buildPhonyType(value: any, name?: string) {
	const typeName = name ? capitalize(name) : `${TYPE_PREFIX}${typeCounter++}`;
	const typeDef = `type ${typeName} {\n  ${Object.entries(value)
		.map(([key, value]) => `${key}: ${buildTypes(value, key)}`)
		.join("\n  ")}\n}`;
	phonyTypes.push(typeDef);
	return typeName;
}

function buildTypes(value: any, key?: string) {
	const type = typeof value;
	if (type === "string") {
		return typeMap.string;
	}
	if (type === "number") {
		return isFloat(value as number) ? typeMap.float : typeMap.int;
	}
	if (type === "object") {
		if (Array.isArray(value)) {
			const [first] = value as any[];
			const firstType = buildTypes(first, pluralize.singular(key));
			return firstType;
		}
		return buildPhonyType(value, key);
	}
}

function buildTypeDefs(json: Database) {
	const queryDefs = Object.entries(json).reduce((current, [key, value]) => {
		const type = buildTypes(value, key);
		const getAll = `get${capitalize(key)}: [${type}]`;
		const getById = `get${capitalize(pluralize.singular(key))}(id: ID!): ${type}`;
		return `${current}${getAll}\n  ${getById}\n`;
	}, "");
	const query = `type Query {\n  ${queryDefs}\n}`;
	const types = phonyTypes.join("\n");
	return `${query}\n${types}`;
}

function buildRoot(json: Database) {
	const root = Object.entries(json).reduce((current, [key, value]) => {
		const getAll = `get${capitalize(key)}`;
		const getById = `get${capitalize(pluralize.singular(key))}`;
		return {...current,
			[getAll]: json[key],
			[getById]: ({id}) => json[key].find(item => item.id === id),
		}
	}, {});
	return root;
}

async function createGraphqlServer(json, port = 1337) {
	const typeDefs = buildTypeDefs(json);
	console.log(typeDefs);
	const schema = buildSchema(typeDefs);
	const rootValue = buildRoot(json);
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
	console.log(`> Client ready on http://localhost:${port}`); // eslint-disable-line no-console
}

export default createGraphqlServer;
