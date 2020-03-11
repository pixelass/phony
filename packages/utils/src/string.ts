import pluralize from "pluralize";

export function capital(str: string): string {
	return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export function isCapital(s: string) {
	return s[0] === s[0].toUpperCase()
}

export function plural(s: string) {
	return pluralize.plural(s)
}

export function singular(s: string) {
	return pluralize.singular(s)
}

export function isPlural(s: string) {
	return pluralize.isPlural(s)
}

export function isSingular(s: string) {
	return pluralize.isSingular(s)
}
