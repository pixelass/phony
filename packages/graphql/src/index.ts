import * as fs from "fs";
import * as path from "path";
import pify from "pify";
import createServer from "@phony/server";
import { buildSchema } from "graphql";
import graphqlHTTP from "express-graphql";
import pluralize from "pluralize";
import cloneDeep from "lodash.clonedeep";
import uniq from "lodash.uniq";
import omit from "lodash.omit";
import { v4 as uuid } from "uuid";

const { readFile, writeFile } = pify(fs);

async function readSchema(filePath) {
	return readFile(filePath, "utf8");
}

async function getSchema(filePath) {
	const typeDefs = await readSchema(filePath);
	return buildSchema(typeDefs);
}

interface DatabaseEntry {
	[key: string]: any;
}
interface Database {
	[key: string]: DatabaseEntry[];
}

const typeMap = {
	id: "ID",
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

function buildPhonyType(value: any, name: string, phonyTypes: string[]) {
	const typeName = capitalize(name);
	const typeDef = `type ${typeName} {\n  ${Object.entries(value)
		.map(
			([key, value]) =>
				`${key}: ${
					pluralize.isPlural(key)
						? `[${buildTypes(value, key, phonyTypes)}]`
						: buildTypes(value, key, phonyTypes)
				}!`
		)
		.join("\n  ")}\n}`;
	phonyTypes.push(typeDef);
	return typeName;
}
function buildPhonyInput(value: any, name: string, phonyTypes: string[]) {
	const typeName = pluralize.singular(capitalize(name));
	const required = [
		"id",
		"title",
		"name",
		"body",
		"content",
		"email",
		"mobile",
		"telephone",
		"phone",
		"tel"
	];
	const inputDef = `input ${typeName}Input {\n  ${Object.entries(value)
		.map(
			([key, value]) =>
				`${key}: ${
					pluralize.isPlural(key)
						? `[${buildTypes(value, key, phonyTypes, buildPhonyInput)}]`
						: buildTypes(value, key, phonyTypes, buildPhonyInput)
				}${required.includes(key) || key.endsWith("_id") ? "!" : ""}`
		)
		.join("\n  ")}\n}`;
	phonyTypes.push(inputDef);
	return typeName;
}

function buildPhonyUpdateInput(value: any, name: string, phonyTypes: string[]) {
	const typeName = pluralize.singular(capitalize(name));
	const inputDef = `input ${typeName}UpdateInput {\n  ${Object.entries(value)
		.map(
			([key, value]) =>
				`${key}: ${
					pluralize.isPlural(key)
						? `[${buildTypes(value, key, phonyTypes, buildPhonyUpdateInput)}]`
						: buildTypes(value, key, phonyTypes, buildPhonyUpdateInput)
				}${key === "id" ? "!" : ""}`
		)
		.join("\n  ")}\n}`;
	phonyTypes.push(inputDef);
	return typeName;
}

function isCapitalized(str) {
	return str[0] === str[0].toUpperCase();
}

function buildTypes(
	value: any,
	key: string,
	phonyTypes: string[] = [],
	buildPhony = buildPhonyType
) {
	if (key === "id" || key.match(/.*_id$/)) {
		return typeMap.id;
	}
	if (isCapitalized(key)) {
		if (pluralize.isPlural(key)) {
			return pluralize.singular(key);
		}
		return key;
	}
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
			return buildTypes(first, pluralize.singular(key), phonyTypes);
		}
		return buildPhony(value, key, phonyTypes);
	}
}

function getNames(key) {
	const cap = capitalize(key);
	const sing = pluralize.singular(cap);
	const create = `create${sing}`;
	const update = `update${sing}`;
	const del = `delete${sing}`;
	const getAll = `get${cap}`;
	const getById = pluralize.singular(getAll);
	const meta = `_${getAll}Meta`;
	return { getAll, getById, meta, create, update, del };
}
const META_DATA_TYPE = "type MetaData {\n  count: Int!\n}";

function buildRelations(json: Database) {
	const data: Database = cloneDeep(json);
	Object.entries(data).forEach(([key, entries]) => {
		const upperKey = capitalize(key);
		entries.forEach(entry => {
			const props = Object.entries(entry).filter(([prop]) => prop.endsWith("_id"));
			props.forEach(([prop, id]) => {
				const propName = prop.replace(/_id$/, "");
				const upperPropName = capitalize(propName);
				const propKey = pluralize.plural(propName);
				const collection = data[propKey];
				collection.forEach(item => {
					const parent = collection.find(item => item.id === id);
					const isParent = item === parent;
					const children = item[upperKey];
					const hasChildren = Array.isArray(children);
					if (isParent && hasChildren) {
						children.push(entry);
					} else if (isParent) {
						item[upperKey] = [entry];
					} else if (!hasChildren) {
						item[upperKey] = [];
					}
					if (!Array.isArray(entry[upperPropName])) {
						entry[upperPropName] = parent;
					}
				});
			});
		});
	});
	return data;
}

function buildTypeDefs(json: Database) {
	const phonyTypes = [];
	const phonyInputs = [];
	const queryDefs = Object.entries(json).reduce((current, [key, value]) => {
		const type = buildTypes(value, key, phonyTypes);
		const names = getNames(key);
		const getAll = `${names.getAll}: [${type}]`;
		const getById = `${names.getById}(id: ID!): ${type}`;
		const meta = `${names.meta}: MetaData`;
		return `${current}\n  ${getAll}\n  ${getById}\n  ${meta}`;
	}, "");
	const mutDefs = Object.entries(json).reduce((current, [key, value]) => {
		const collection = json[key];
		const names = getNames(key);
		const [first] = collection;
		const removables = ["date", "count", "created", "updated"];
		const removals = Object.keys(first).filter(
			x =>
				removables.includes(x) ||
				removables.filter(removable => x.endsWith(`_${removable}`)).length ||
				isCapitalized(x)
		);
		const initialProps = omit(first, ["id", ...removals.filter(x =>  !x.endsWith("_id"))]);
		const initialUpdateProps = omit(first, [...Object.keys(first).map(x => x.endsWith("_id") ? x : null), ...removals].filter(Boolean));
		buildTypes(initialProps, key, phonyInputs, buildPhonyInput);
		buildTypes(initialUpdateProps, key, phonyInputs, buildPhonyUpdateInput);
		const type = buildTypes(first, key, []);
		const singularType = pluralize.singular(type);
		const create = `${names.create}(input: ${singularType}Input): ${singularType}`;
		const update = `${names.update}(input: ${singularType}UpdateInput): ${singularType}`;
		const del = `${names.del}(id: ID!): Boolean`;
		return `${current}\n  ${create}\n  ${update}\n  ${del}`;
	}, "");
	const query = `type Query {${queryDefs}\n}`;
	const mut = `type Mutation {${mutDefs}\n}`;
	return [query, mut, META_DATA_TYPE, ...uniq(phonyTypes), ...uniq(phonyInputs)].join("\n\n");
}

function buildRoot(json: Database) {
	const root = Object.entries(json).reduce((current, [key, value]) => {
		const names = getNames(key);
		let collection = json[key];

		return {
			...current,
			[names.getAll]: () => collection,
			[names.getById]: ({ id }) => collection.find(item => `${item.id}` === id),
			[names.meta]: () => ({
				count: collection.length
			}),
			[names.create]: (...args) => {
				const newObj = {
					...args,
					id: uuid(),
					created: new Date()
				};
				collection.push(newObj);
				return newObj;
			},
			[names.update]: ({ id, ...args }) => {
				const item = collection.find(item => item.id === id);
				const itemIndex = collection.findIndex(item => item.id === id);
				const newObj = {
					...item,
					...args,
					updated: new Date()
				};
				collection[itemIndex] = newObj;
				return newObj;
			},
			[names.del]: (id) => {
				collection = collection.filter(item => item.id === id);
				return true;
			}
		};
	}, {});
	return root;
}

async function createGraphqlServer(json, port = 1337) {
	const data = buildRelations(json);
	const typeDefs = buildTypeDefs(data);
	await writeFile(path.resolve(process.cwd(), "schema.graphql"), typeDefs);
	const schema = buildSchema(typeDefs);
	const rootValue = buildRoot(data);
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
