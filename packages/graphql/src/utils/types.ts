export type RootFunction = (...args: any[]) => any;

export interface Root {
	[key: string]: RootFunction;
}

export interface DatabaseEntry {
	id: string;
	[key: string]: any;
}

export interface Entry {
	[key: string]: any;
}
export interface Database {
	[key: string]: DatabaseEntry[];
}

export interface NameConfig {
	get: {
		all: string;
		byId: string;
		meta: string;
	};
	post: {
		create: string;
		update: string;
		delete: string;
	};
	input: {
		filter: string;
		create: string;
		update: string;
	};
}

export interface NameMap {
	[key: string]: NameConfig;
}

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
