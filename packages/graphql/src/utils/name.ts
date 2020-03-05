import { capitalize, pluralize } from "@phony/utils";

export function getNameVariants(input) {
	const name = pluralize.singular(input);
	const name_ = pluralize.plural(name);
	const Name = capitalize(name);
	const Name_ = capitalize(name_);
	return {
		singular: {
			lower: name,
			capital: Name
		},
		plural: {
			lower: name_,
			capital: Name_
		}
	};
}
