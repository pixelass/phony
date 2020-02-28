import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";

export const theme = responsiveFontSizes(createMuiTheme({
			palette: {
				primary: indigo,
				secondary: pink
			}
		}));
