import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import pify from "pify";


const fsp = {
	readFile: pify(fs.readFile),
	writeFile: pify(fs.writeFile)
};

export function writeFile(filePath: string, content: string): Promise<boolean> {
	const { dir } = path.parse(filePath);
	return new Promise((resolve, reject) => {
		mkdirp(dir)
			.then(() => {
				fsp.writeFile(filePath, content)
					.then(() => resolve(true))
					.catch(error => {
						reject(error);
					});
			})
			.catch(error => {
				reject(error);
			});
	});
}

export function readFile(filePath: string): Promise<string> {
	return fsp.readFile(filePath, "utf-8");
}
