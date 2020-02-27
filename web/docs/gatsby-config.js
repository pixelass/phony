module.exports = {
	pathPrefix: `/phony`,
	siteMetadata: {
		title: `Phony`,
		name: `Phony`,
		siteUrl: `https://pixelass.gihub.io/phony`,
		description: `Phony service. mock graphql json-server`,
		social: [
			{
				name: `github`,
				url: `https://github.com/pixelass/phony`
			},
			{
				name: `github`,
				url: `https://github.com/pixelass/phony/issues`
			}
		],
		sidebarConfig: {
			forcedNavOrder: ["/introduction", "/phonyql"],
			ignoreIndex: true
		}
	},
	plugins: [{ resolve: `gatsby-theme-document` }]
};
