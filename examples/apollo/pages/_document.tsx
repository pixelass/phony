import * as React from "react";
import Document from "next/document";
import MaterialUiServerStyleSheet from "@material-ui/styles/ServerStyleSheets";
import client from "../utils/apollo";
import {APOLLO_STATE} from "../constants/root";

export default class CustomDocument extends Document {
	static async getInitialProps(ctx) {
		const materialUiSheets = new MaterialUiServerStyleSheet();
		const originalRenderPage = ctx.renderPage;
		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props =>
							materialUiSheets.collect(<App {...props} />)
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<React.Fragment>
						{initialProps.styles}
						{materialUiSheets.getStyleElement()}
						<script
							dangerouslySetInnerHTML={{
								__html: `window.${APOLLO_STATE}=${JSON.stringify(
									client.extract()
								).replace(/</g, "\\u003c")};`
							}}
						/>
					</React.Fragment>
				)
			};
		} finally {
		}
	}
}
