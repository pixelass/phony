module.exports = ({name, version, author, repository, license}) => `/*!
 * Copyright (c) ${typeof author === "object" ? author.name : author}
 * @author ${typeof author === "object" ? author.name : author}
 * @license ${license}
 * @name ${name}
 * @version ${version}
 *${repository ? ` @see ${typeof repository === "object" ? repository.url : repository}\n */` : "/"}`;
