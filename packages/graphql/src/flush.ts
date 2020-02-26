import {writeFile, prettyJSON} from "@phony/utils";

async function flushData(data, filePath) {
	return writeFile(filePath, prettyJSON(data))
		.then(() => true)
		.catch(error => {
			console.error(error);
			return false;
		});
}

export default flushData;
