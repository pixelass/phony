import {Database, Root} from "./types";
import {getNames} from "./names";
import {v4 as uuid} from "uuid";
import {update as updateDB} from "./database";
import {getPage, isSame, withSorting, withFilter} from "@phony/utils";

export function buildRoot(data: Database, plainData: Database, filePath): Root {
	return Object.entries(data).reduce((current, [key]) => {
		const names = getNames(key);
		let collection = data[key];
		let plainCollection = plainData[key];

		return {
			...current,
			[names.getAll]: ({pagination, sorting, filter}) => getPage(withSorting(withFilter(collection, filter), sorting), pagination),
			[names.getById]: ({id}) => collection.find(isSame(id)),
			[names.meta]: () => ({
				count: collection.length,
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
			[names.update]: async ({id, input}) => {
				const compare = isSame(id);
				const item = collection.find(compare);
				const itemIndex = collection.findIndex(compare);
				const plainItem = plainCollection.find(compare);
				const newObj = {
					...input,
					updated: new Date()
				};
				const newItem = {...item, ...newObj};
				const newEntry = {...plainItem, ...newObj};
				collection[itemIndex] = newItem;
				plainCollection[itemIndex] = newEntry;
				await updateDB(plainData, filePath);
				return newItem;
			},
			[names.del]: async ({id}) => {
				const compare = isSame(id);
				collection = collection.filter(compare);
				plainCollection = plainCollection.filter(compare);
				await updateDB(plainData, filePath);
				return true;
			}
		};
	}, {});
}
