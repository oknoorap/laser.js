const { writeFileSync } = require("fs");
const path = require("path");

const distFolder = path.resolve(__dirname, "..", "dist");
const pkg = require(`${distFolder}/package.json`);

delete pkg.scripts;

writeFileSync(`${distFolder}/package.json`, JSON.stringify(pkg, null, 2));
