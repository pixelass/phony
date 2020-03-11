module.exports = {
	presets: ["@babel/preset-env", "@babel/preset-typescript"],
	plugins: [
		"@babel/plugin-proposal-class-properties",
		"@babel/plugin-proposal-object-rest-spread",
		[
			"babel-plugin-transform-inline-environment-variables",
			{
				include: ["NODE_ENV"]
			}
		]
	],
	env: {
		test: {
			plugins: ["babel-plugin-istanbul"]
		}
	}
};
