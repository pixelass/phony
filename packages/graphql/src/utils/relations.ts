import { Database } from "./types";
import cloneDeep from "lodash.clonedeep";
import { capitalize, isRelative, isSame, pluralize, isArray } from "@phony/utils";
import { ID_SUFFIX_PATTERN } from "../constants";

export function buildRelations(json: Database): Database {
	const data: Database = cloneDeep(json);
	Object.entries(data).forEach(([key, entries]) => {
		const upperKey = capitalize(key);
		entries.forEach(entry => {
			const props = Object.entries(entry).filter(([prop]) => isRelative(prop));
			props.forEach(([prop, id]) => {
				const propName = prop.replace(ID_SUFFIX_PATTERN, "");
				const upperPropName = capitalize(propName);
				const propKey = pluralize.plural(propName);
				const collection = data[propKey];
				collection.forEach(item => {
					const parent = collection.find(isSame(id));
					const isParent = item === parent;
					const children = item[upperKey];
					const hasChildren = isArray(children);
					if (isParent && hasChildren) {
						// Add entry to collection
						children.push(entry);
					} else if (isParent) {
						// Add collection with one entry
						item[upperKey] = [entry];
					} else if (!hasChildren) {
						// Always ensure an empty collection for all siblings
						item[upperKey] = [];
					}
					if (!isArray(entry[upperPropName])) {
						entry[upperPropName] = parent;
					}
				});
			});
		});
	});
	return data;
}
