import {Database} from "./types";
import {getNames} from "./names";
import {v4 as uuid} from "uuid";
import {update as updateDB} from "./database";
import {isSame} from "@phony/utils";

export function buildRoot(data: Database, plainData: Database, filePath) {
	return Object.entries(data).reduce((current, [key]) => {
		const names = getNames(key);
		let collection = data[key];
		let plainCollection = plainData[key];

		return {
			...current,
			[names.getAll]: () => collection,
			[names.getById]: ({id}) => collection.find(isSame(id)),
			[names.meta]: () => ({
				count: collection.length
			}),
			[names.create]: async ({input}) => {
				const newObj = {
					...input,
					id: uuid(),
					created: new Date()
				};
				collection.push(newObj);
				plainCollection.push(newObj);
				await updateDB(plainData, filePath);
				return newObj;
			},
			[names.update]: async ({input: {id, ...args}}) => {
				const compare = isSame(id);
				const item = collection.find(compare);
				const itemIndex = collection.findIndex(compare);
				const plainItem = plainCollection.find(compare);
				const newObj = {
					...args,
					updated: new Date()
				};
				const newItem = {...item, ...newObj};
				const newEntry = {...plainItem, ...newObj};
				collection[itemIndex] = newItem;
				plainCollection[itemIndex] = newEntry;
				await updateDB(plainData, filePath);
				return newItem;
			},
			[names.del]: async id => {
				const compare = isSame(id);
				collection = collection.filter(compare);
				plainCollection = plainCollection.filter(compare);
				await updateDB(plainData, filePath);
				return true;
			}
		};
	}, {});
}
