import pluralize from "pluralize";

export function capital(str: string): string {
	return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export function isCapital(s: string) {
	return s[0] === s[0].toUpperCase()
}

export function plural(s: string) {
	pluralize.plural(s)
}

export function singular(s: string) {
	pluralize.singular(s)
}

export function isPlural(s: string) {
	pluralize.isPlural(s)
}

export function isSingular(s: string) {
	pluralize.isSingular(s)
}
