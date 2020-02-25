const createGraphqlServer = require("@phony/graphql");

const db = {
	users: [
		{
			email: "bart@simpson.com",
			id: "bart_simpson",
			name: "Bart Simpson"
		},
		{
			email: "lisa@simpson.com",
			id: "lisa_simpson",
			name: "Lisa Simpson",
		}
	],
	jobs: [
		{
			name: "Doctor",
			id: "doctor"
		},
		{
			name: "Teacher",
			id: "teacher"
		},
		{
			name: "Plumber",
			id: "plumber"
		},
		{
			name: "Developer",
			id: "developer"
		}
	]
}
createGraphqlServer(db, 3001);
