export const withSortOrder = (columns, {sortField, sortOrder}) =>
	columns.map(column => ({
		...column,
		defaultSort: sortField === column.field ? sortOrder : undefined
	}));
