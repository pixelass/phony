module.exports = {
	posts: [
		{
			id: 1,
			title: "Lorem Ipsum",
			view_count: 254,
			user_id: 123,
			created: new Date("2016-07-03"),
			updated: new Date("2016-07-06")
		},
		{
			id: 2,
			title: "Sic Dolor amet",
			view_count: 65,
			user_id: 456,
			created: new Date("2016-07-03")
		},
		{
			id: 3,
			title: "Ridetis foris ducunt ad nobilis pars",
			view_count: 198,
			user_id: 456,
			created: new Date("2016-07-03"),
			updated: new Date("2016-07-06")
		},
		{
			id: 4,
			title: "Calcaria velox resistentia est",
			view_count: 271,
			user_id: 456,
			created: new Date("2016-07-03"),
			updated: new Date("2016-07-06")
		}
	],
	users: [
		{
			id: 123,
			name: "John Doe",
			email: "john@doe.com",
			company: "Doe Inc.",
			bio: "Germanus, regius valebats etiam contactus de magnum, raptus burgus."
		},
		{
			id: 456,
			name: "Jane Doe",
			email: "jane@doe.com",
			company: "Doe Inc.",
			bio: "Apolloniatess cantare! Clabulare nobilis gemna est."
		}
	],
	comments: [
		{ id: 987, post_id: 1, body: "Consectetur adipiscing elit", created: new Date("2017-07-03") },
		{ id: 995, post_id: 1, body: "Nam molestie pellentesque dui", created: new Date("2017-08-17") }
	]
};
