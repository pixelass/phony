import { capital, plural, singular } from "@phony/utils";

export function getNameVariants(input) {
	const name = singular(input);
	const name_ = plural(name);
	const Name = capital(name);
	const Name_ = capital(name_);
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
