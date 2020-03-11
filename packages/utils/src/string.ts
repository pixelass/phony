import pluralize from "pluralize";

export function capital(str: string): string {
	return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export function isCapital(s: string) {
	return s[0] === s[0].toUpperCase()
}

/* istanbul ignore next */
export function plural(s: string) {
	return pluralize.plural(s)
}

/* istanbul ignore next */
export function singular(s: string) {
	return pluralize.singular(s)
}

/* istanbul ignore next */
export function isPlural(s: string) {
	return pluralize.isPlural(s)
}

/* istanbul ignore next */
export function isSingular(s: string) {
	return pluralize.isSingular(s)
}
