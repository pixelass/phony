/*
  Do not copy/paste this file. It is used internally
  to manage end-to-end test suites.
*/

const {default: NextI18Next} = require("next-i18next");
const i18nConfig = require("./i18n.config");
module.exports = new NextI18Next(i18nConfig);
