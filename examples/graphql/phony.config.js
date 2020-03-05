module.exports = {
	queryConfig: {
		get: {
			byId: "[Name]",
			all: "all[Name]s",
			meta: "_all[Names]Meta"
		},
		post: {
			create: "create[Name]",
			update: "update[Name]",
			delete: "remove[Name]"
		},
		input: {
			filter: "[Names]Filter",
			filterFields: "[Names]FilterFields",
			create: "[Name]InitInput",
			update: "[Name]UpdateInput"
		},
		internalFields: {
			created: "created",
			updated: "updated",
			views: "views"
		}
	},
	schema: "schema.graphql",
	input: "db.js",
	database: "db.json",
	port: 1337
}
