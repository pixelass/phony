import * as React from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

export interface Icons {
	Add?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	Check?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	Clear?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	Delete?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	DetailPanel?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	Edit?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	Export?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	Filter?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	FirstPage?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	SortArrow?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	LastPage?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	NextPage?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	PreviousPage?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	ResetSearch?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	Search?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	ThirdStateCheck?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
	ViewColumn?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
}

export const tableIcons: Icons = {
	Add: React.forwardRef((props, ref) => <AddBox {...props} ref={ref as React.LegacyRef<any>} />),
	Check: React.forwardRef((props, ref) => <Check {...props} ref={ref as React.LegacyRef<any>} />),
	Clear: React.forwardRef((props, ref) => <Clear {...props} ref={ref as React.LegacyRef<any>} />),
	Delete: React.forwardRef((props, ref) => (
		<DeleteOutline {...props} ref={ref as React.LegacyRef<any>} />
	)),
	DetailPanel: React.forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref as React.LegacyRef<any>} />
	)),
	Edit: React.forwardRef((props, ref) => <Edit {...props} ref={ref as React.LegacyRef<any>} />),
	Export: React.forwardRef((props, ref) => (
		<SaveAlt {...props} ref={ref as React.LegacyRef<any>} />
	)),
	Filter: React.forwardRef((props, ref) => (
		<FilterList {...props} ref={ref as React.LegacyRef<any>} />
	)),
	FirstPage: React.forwardRef((props, ref) => (
		<FirstPage {...props} ref={ref as React.LegacyRef<any>} />
	)),
	LastPage: React.forwardRef((props, ref) => (
		<LastPage {...props} ref={ref as React.LegacyRef<any>} />
	)),
	NextPage: React.forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref as React.LegacyRef<any>} />
	)),
	PreviousPage: React.forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref as React.LegacyRef<any>} />
	)),
	ResetSearch: React.forwardRef((props, ref) => (
		<Clear {...props} ref={ref as React.LegacyRef<any>} />
	)),
	Search: React.forwardRef((props, ref) => (
		<Search {...props} ref={ref as React.LegacyRef<any>} />
	)),
	SortArrow: React.forwardRef((props, ref) => (
		<ArrowDropDown
			{...props}
			ref={ref as React.LegacyRef<any>}
		/>
	)),
	ThirdStateCheck: React.forwardRef((props, ref) => (
		<Remove {...props} ref={ref as React.LegacyRef<any>} />
	)),
	ViewColumn: React.forwardRef((props, ref) => (
		<ViewColumn {...props} ref={ref as React.LegacyRef<any>} />
	))
};
