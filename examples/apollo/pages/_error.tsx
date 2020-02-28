import * as React from "react";
import {useTranslation} from "../utils/i18n";
import {Typography} from "@material-ui/core";

const Error = ({statusCode}) => {
	const {t} = useTranslation("error");
	return <Typography variant={"h3"}>{t(statusCode)}</Typography>;
};

Error.getInitialProps = ({res, err}) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return {
		namespacesRequired: ["error"],
		statusCode
	};
};

export default Error;
