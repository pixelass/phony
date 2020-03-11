export type RootFunction = (...args: any[]) => any;

export interface Root {
	[key: string]: RootFunction;
}

export interface DatabaseEntry {
	id: string | number;
	[key: string]: any;
}

export type DatabaseCollection = DatabaseEntry[];

export interface Entry {
	[key: string]: any;
}
export interface Database {
	[key: string]: DatabaseCollection;
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
		filterFields: string;
		filter: string;
		create: string;
		update: string;
	},
	internalFields: {
		[key: string]: string;
	}
	;
}

export interface NameMap {
	[key: string]: NameConfig;
}


export interface PonyConfig {
	queryConfig: NameConfig;
	schema: string;
	input: string;
	database: string;
	port: string | number;
}
