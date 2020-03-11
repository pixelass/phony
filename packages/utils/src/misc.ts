import {ItemComparison} from "./types";
import {ID, ID_SUFFIX} from "./constants";

/* istanbul ignore next */
export function isRelated(id: number | string, name: string): ItemComparison {
	return item => `${item[name]}` === `${id}`;
}

/* istanbul ignore next */
export function isSame(id: string): ItemComparison {
	return isRelated(id, "id");
}

export function isId(str: string): boolean {
	return str === ID;
}

export function isRelative(str: string): boolean {
	return str.endsWith(ID_SUFFIX);
}

export function withRequired(condition: boolean): string {
	return condition ? "!" : "";
}

export function withArray(str: string, condition: boolean): string {
	return condition ? `[${str}!]` : str;
}

export function withoutArray(str: string): string {
	return str.replace(/\[(.*)!]/, "$1");
}
