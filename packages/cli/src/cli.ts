import meow from "meow";

export const {
	input: [cmd, filePath = "db.js"],
	flags
} = meow(
	`
Usage
  $ phony graphql <input> [...flags]

Options
  --export, -e    schema will be exported when true
  --schema, -s    schema will be exported to this path
  --database, -d  database will be generated or read from to this path
  --no-serve, -n  don't serve (only exports schema)
  --flush, -f     resets the local database (removes all additions, updates and deletions)
  --init, -i      initializes the local database (only if it doesn't exist, does not flush)
  --port, -p      port for graphql service

Examples
$ phony graphql -i
$ phony graphql my-database.js -s my-schema.grahphl -e
`,
	{
		flags: {
			schema: {
				type: "string",
				alias: "s",
				default: "schema.graphql"
			},
			"no-serve": {
				type: "boolean",
				alias: "n"
			},
			port: {
				type: "string",
				alias: "p",
				default: "1337"
			},
			database: {
				type: "string",
				alias: "d",
				default: "db.json"
			},
			flush: {
				type: "boolean",
				alias: "f"
			},
			export: {
				type: "boolean",
				alias: "e"
			},
			init: {
				type: "boolean",
				alias: "i"
			}
		}
	}
);
