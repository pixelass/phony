const path = require("path");
const babel = require("rollup-plugin-babel");
const json = require("rollup-plugin-json");
const commonjs = require("rollup-plugin-commonjs");
const typescript = require("rollup-plugin-typescript2");
const createBanner = require("../../utils/rollup/banner");

module.exports = function() {
	const cwd = process.cwd();
	const pkg = require(path.resolve(cwd, "package.json"));
	const tsconfig = path.resolve(cwd, "tsconfig.json");
	return [
		{
			input: "src/index.ts",
			external: [
				...Object.keys(pkg.dependencies || {})
			],
			output: [
				{
					banner: createBanner(pkg),
					file: pkg.main,
					format: "cjs"
				},
				{
					banner: createBanner(pkg),
					file: pkg.module,
					format: "esm"
				}
			],
			plugins: [
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
		},
		{
			input: "src/flush.ts",
			external: [
				...Object.keys(pkg.dependencies || {})
			],
			output: [
				{
					banner: createBanner(pkg),
					file: "dist/flush.js",
					format: "cjs"
				},
				{
					banner: createBanner(pkg),
					file: "dist/esm/flush.js",
					format: "esm"
				}
			],
			plugins: [
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
		}
	];
};
