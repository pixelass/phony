module.exports = {
	items: [
		{
			id: "0".padStart(4, "0"),
			name: "Item One",
			created: new Date(),
			updated: new Date(),
			description: "This is an item",
			price: 10.54,
			stock: 300
		},
		... (new Array(300).fill(Boolean).map((x, i) => ({
			id: `${i + 1}`.padStart(4, "0"),
			name: `Item ${i + 2}`,
			created: new Date(`2019-${i%12 + 1}-${i%28 + 1}`),
			price: Math.floor(Math.random() * 1000) / 100,
			stock: Math.floor(Math.random() * 1000)
		})))
	]
}
