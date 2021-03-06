import { Database } from "./types";
import cloneDeep from "lodash.clonedeep";
import { isRelative, isSame, capital, plural } from "@phony/utils";
import { isArray } from "is-what";

export function buildRelations(json: Database): Database {
	const data: Database = cloneDeep(json);
	Object.entries(data).forEach(([key, entries]) => {
		const upperKey = capital(key);
		entries.forEach(entry => {
			Object.entries(entry)
				.filter(([prop]) => isRelative(prop))
				.forEach(([prop, id]) => {
					const propName = prop.replace(/_id$/, "");
					const upperPropName = capital(propName);
					const propKey = plural(propName);
					const collection = data[propKey];
					collection.forEach(item => {
						const parent = collection.find(isSame(id));
						const isParent = item === parent;
						const children = item[upperKey];
						const hasChildren = isArray(children);
						if (isParent && hasChildren) {
							children.push(entry);
						} else if (isParent) {
							item[upperKey] = [entry];
						} else if (!hasChildren) {
							item[upperKey] = [];
						}
						/* istanbul ignore else */
						if (!isArray(entry[upperPropName])) {
							entry[upperPropName] = parent;
						}
					});
				});
		});
	});
	return data;
}
