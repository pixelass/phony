import NextI18Next from "next-i18next";
import i18nConfig from "../i18n.config";

const NextI18NextInstance = new NextI18Next(i18nConfig);

export const {appWithTranslation, i18n, useTranslation, withTranslation, Link} = NextI18NextInstance;
