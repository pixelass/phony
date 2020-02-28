module.exports = {
	posts: [
		{
			id: 1,
			title: "Lorem Ipsum",
			view_count: 254,
			user_id: 123,
			created: new Date("2016-11-15"),
			updated: new Date("2016-11-16")
		},
		{
			id: 2,
			title: "Sic Dolor amet",
			view_count: 65,
			user_id: 456,
			created: new Date("2016-09-21")
		},
		{
			id: 3,
			title: "Ridetis foris ducunt ad nobilis pars",
			view_count: 198,
			user_id: 456,
			created: new Date("2016-03-15"),
			updated: new Date("2016-07-06")
		},
		{
			id: 4,
			title: "Calcaria velox resistentia est",
			view_count: 271,
			user_id: 456,
			created: new Date("2016-11-02"),
		}
	],
	users: [
		{
			id: 123,
			name: "John Doe",
			email: "john@doe.com",
			company: "Doe Inc.",
			bio: "Germanus, regius valebats etiam contactus de magnum, raptus burgus.",
			created: new Date("2015-01-03"),
			updated: new Date("2017-01-03")
		},
		{
			id: 456,
			name: "Jane Doe",
			created: new Date("2015-10-12")
		}
	],
	comments: [
		{
			id: 987,
			post_id: 1,
			body: "Consectetur adipiscing elit",
			created: new Date("2017-02-19"),
			updated: new Date("2017-02-09")
		},
		{
			id: 995,
			post_id: 1,
			body: "Nam molestie pellentesque dui",
			created: new Date("2017-08-17")
		}
	]
};
