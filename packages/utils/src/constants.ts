export const ID = "id";
export const ID_SUFFIX = `_${ID}`;
export const ID_PATTERN = new RegExp(`${ID_SUFFIX}$`);
export const NL = "\n";
export const NNL = "\n\n";
export const __ = "  ";
export const NL__ = `${NL}${__}`;
export enum OPERATORS {
	gt = "gt",
	gte = "gte",
	lt = "lt",
	lte = "lte"
}
