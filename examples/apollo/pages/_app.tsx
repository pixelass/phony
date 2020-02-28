import {AppContextType, AppType} from "next/dist/next-server/lib/utils";
import * as React from "react";
import {ApolloProvider} from "@apollo/client";
import {ThemeProvider} from "@material-ui/styles";
import client from "../utils/apollo";
import {appWithTranslation} from "../utils/i18n";
import {theme} from "../theme";
import "../empty.css";

const Cockpit: AppType = ({Component, pageProps}) => {
	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
					<Component {...pageProps} />
			</ThemeProvider>
		</ApolloProvider>
	);
};

async function getPageProps({Component, ctx}: AppContextType) {
	return Component.getInitialProps ? Component.getInitialProps(ctx) : {};
}

Cockpit.getInitialProps = async (appContext: AppContextType) => {
	return {
		pageProps: {
			...(await getPageProps(appContext))
		}
	};
};

export default appWithTranslation(Cockpit);
