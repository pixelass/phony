import meow from "meow";

export const {input: [cmd, filePath], flags} = meow(`
	Usage
	  $ phony graphql <input>

	Options
	  --export-schema, -e schema will be exported to this path
	  --database, -d database will be generates or read from to this path
	  --no-serve, -n don't serve (only exports schema)
	  --flush, -f resets the local database (removes all additions, updates and deletions)
	  --init, -i initializes the local database (only if it doesn't exist, does not flush)
	  --port, -p port for graphql

	Examples
	  $ phony graphql db.js -i ## run server with initialized database
	  $ phony graphql db.js -fn ## flush database only
	  $ phony graphql db.js -e schema.graphql -n ## export schema only
`, {
	flags: {
		"export-schema": {
			type: "string",
			alias: "e"
		},
		"no-serve": {
			type: "boolean",
			alias: "n"
		},
		port: {
			type: "string",
			alias: "p",
			"default": "1337"
		},
		database: {
			type: "string",
			alias: "d",
			"default": "db.json"
		},
		flush: {
			type: "boolean",
			alias: "f"
		},
		init: {
			type: "boolean",
			alias: "i"
		}
	}
});
