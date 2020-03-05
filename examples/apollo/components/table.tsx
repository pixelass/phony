import * as React from "react";
import MaterialTable, {Icons} from "material-table";
import {tableIcons} from "./icons";
import {useTranslation} from 'react-i18next'

export default function Table({options, columns, data, ...props}) {
	const {t} = useTranslation("translation");
	return (
		<MaterialTable
			{...props}
			columns={columns}
			data={data}
			icons={tableIcons}
			options={{
				draggable: false,
				emptyRowsWhenPaging: false,
				...options
			}}
			localization={{
				body: {
					emptyDataSourceMessage: t("no_records")
				},
				toolbar: {
					searchTooltip: t("search"),
					searchPlaceholder: t("search")
				},
				pagination: {
					labelRowsSelect: t("rows"),
					labelDisplayedRows: t("from_to_of"),
					firstTooltip: t("first"),
					previousTooltip: t("previous"),
					nextTooltip: t("next"),
					lastTooltip: t("last")
				},
				header: {
					actions: t("actions")
				}
			}}
		/>
	);
}
