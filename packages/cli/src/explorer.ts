import { cosmiconfig } from "cosmiconfig";

export interface PonyConfig {
	queryConfig: {
		get: {
			byId: string;
			all: string;
			meta: string;
		};
		post: {
			create: string;
			update: string;
			delete: string;
		};
		input: {
			filter: string;
			filterFields: string;
			create: string;
			update: string;
		};
		internalFields: {
			created: string;
			updated: string;
			views: string;
		};
	};
	schema: string;
	input: string;
	database: string;
	port: string | number;
}

function explorer(): Promise<{ config: any; filepath: string; isEmpty?: boolean }> {
	return cosmiconfig("phony").search();
}

export default explorer;
