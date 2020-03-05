module.exports = {
	queryConfig: {
		get: {
			byId: "get[Name]",
			all: "get[Name]s",
			meta: "_get[Names]Meta"
		},
		post: {
			create: "create[Name]",
			update: "update[Name]",
			delete: "delete[Name]"
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
	port: 4000
}
