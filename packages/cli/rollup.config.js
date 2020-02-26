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
			input: "src/bin.ts",
			external: [
				...Object.keys(pkg.dependencies || {})
			],
			output: [
				{
					banner: createBanner(pkg),
					file: `dist/${pkg.bin.phony}`,
					format: "cjs"
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
