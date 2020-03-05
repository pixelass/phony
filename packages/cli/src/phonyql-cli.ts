import meow from "meow";

export const {
	input: [filePath = "db.js"],
	flags
} = meow(
	`
Usage
  $ phonyql <input> [...flags]

Options
  --export, -e      schema will be exported when true
  --schema, -s      schema will be exported to this path
  --database, -d    database will be generated or read from to this path
  --no-serve, -n    don't serve
  --flush, -f       resets the local database (removes all additions, updates and deletions)
  --init, -i        initializes the local database (only if it doesn't exist, does not flush)
  --port, -p        port for graphql service

Examples
$ phonyql -i
$ phonyql my-database.js -es my-schema.grahphl
`,
	{
		flags: {
			schema: {
				type: "string",
				alias: "s"
			},
			"no-serve": {
				type: "boolean",
				alias: "n"
			},
			port: {
				type: "string",
				alias: "p"
			},
			database: {
				type: "string",
				alias: "d"
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
