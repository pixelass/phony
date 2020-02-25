import fs from "fs";
import pify from "pify";

const { writeFile } = pify(fs);

function prettyJSON(data, space = 4) {
	return JSON.stringify(data, null, space);
}

async function flushData(data, filePath) {
	await writeFile(filePath, prettyJSON(data))
		.then(() => true)
		.catch(error => {
			console.error(error);
			return false;
		});
}

export default flushData;
