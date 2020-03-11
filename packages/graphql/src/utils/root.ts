import { v4 as uuid } from "uuid";
import { update as updateDB } from "./database";
import { getPage, isSame, withSorting, withFilter } from "@phony/utils";
import { Database, Root, NameMap } from "./types";

export function buildRoot(data: Database, plainData: Database, names: NameMap, config): Root {
	const {
		queryConfig: {
			internalFields: { created, updated }
		},
		database
	} = config;

	return Object.entries(data).reduce((current, [key]) => {
		const localNames = names[key];
		let collection = data[key];
		let plainCollection = plainData[key];

		return {
			...current,
			[localNames.get.all]: ({ pagination, sorting, filter }) =>
				getPage(withSorting(withFilter(collection, filter), sorting), pagination),
			[localNames.get.byId]: ({ id }) => collection.find(isSame(id)),
			[localNames.get.meta]: () => ({
				count: collection.length
			}),
			[localNames.post.create]: async ({ input }) => {
				const newObj = {
					...input,
					id: uuid(),
					[created]: new Date()
				};
				collection.push(newObj);
				plainCollection.push(newObj);
				await updateDB(plainData, database);
				return newObj;
			},
			[localNames.post.update]: async ({ id, input }) => {
				const compare = isSame(id);
				const item = collection.find(compare);
				const itemIndex = collection.findIndex(compare);
				const plainItem = plainCollection.find(compare);
				const newObj = {
					...input,
					[updated]: new Date()
				};
				const newItem = { ...item, ...newObj };
				const newEntry = { ...plainItem, ...newObj };
				collection[itemIndex] = newItem;
				plainCollection[itemIndex] = newEntry;
				await updateDB(plainData, database);
				return newItem;
			},
			[localNames.post.delete]: async ({ id }) => {
				const compare = isSame(id);
				collection = collection.filter(compare);
				plainCollection = plainCollection.filter(compare);
				await updateDB(plainData, database);
				return true;
			}
		};
	}, {});
}
