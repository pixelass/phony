module.exports = {
	items: [
		{
			id: "0000",
			name: "Item 1",
			created: new Date(),
			updated: new Date(),
			description: "This is an item",
			price: 10.54,
			stock: 300
		},
		{
			id: "0001",
			name: "Item 2",
			created: new Date(),
			price: 21.31,
			stock: 100
		},
		... (new Array(300).fill(Boolean).map((x, i) => ({
			id: `${i + 2}`.padStart(4, "0"),
			name: `Item ${i + 3}`,
			created: new Date(`2019-${i%12 + 1}-${i%28 + 1}`),
			price: Math.floor(Math.random() * 1000) / 100,
			stock: Math.floor(Math.random() * 1000)
		})))
	]
}
