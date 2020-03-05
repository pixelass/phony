const path = require("path");
const babel = require("rollup-plugin-babel");
const json = require("@rollup/plugin-json");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("rollup-plugin-typescript2");
const createBanner = require("../../utils/rollup/banner");

module.exports = function() {
	const cwd = process.cwd();
	const pkg = require(path.resolve(cwd, "package.json"));
	const tsconfig = path.resolve(cwd, "tsconfig.json");
	const external = [
		...Object.keys(pkg.dependencies || {})
	];
	const plugins = [
		commonjs(),
		json(),
		babel(),
		typescript({
			tsconfig,
			tsconfigOverride: {
				compilerOptions: {
					module: "es6"
				}
			}
		})
	]
	return Object.entries(pkg.bin).map(([, input]) => ({
		input: `src/${input}`.replace(".js", ".ts"),
		external,
		output: [
			{
				banner: createBanner(pkg),
				file: `dist/${input}`,
				format: "cjs"
			},
			{
				banner: createBanner(pkg),
				file: `dist/esm/${input}`,
				format: "esm"
			}
		],
		plugins
	}));
};
