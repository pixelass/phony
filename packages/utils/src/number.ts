export {
	isNumber
} from "is-what";

export function isFloat(n: number): boolean {
	return n === +n && n !== (n | 0);
}

export function isInteger(n: number): boolean {
	return n === +n && n === (n | 0);
}
