const Mode = require("frontmatter-markdown-loader/mode");
const withCSS = require("@zeit/next-css");
const {config} = require("dotenv");
config();

module.exports = withCSS({
	transpileModules: ["(.*)"],
	env: {
		graphqlUri: process.env.GRAPHQL_URI
	},
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.md$/,
			use: [
				options.defaultLoaders.babel,
				{
					loader: "frontmatter-markdown-loader",
					options: {
						mode: [Mode.BODY]
					}
				}
			]
		});
		return config;
	}
});
