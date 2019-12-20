const fs = require("fs-extra");
const rl = require("readline");

const { dist: opts, version, name, homepage } = require("../package.json");

const getLineCount = () => {
  let count = 0;
  const stream = fs.createReadStream("./data/" + opts.file);

  const reader = rl.createInterface({ input: stream });

  reader.on("line", () => count++);

  return new Promise((resolve, reject) => {
    reader.on("close", () => resolve(count));
    reader.on("error", error => reject(error));
  });
};

const getDBVersion = () => {
  return opts.file
    .toString()
    .split(".tsv")[0]
    .split("_")
    .slice("-1")[0];
};

module.exports = {
  getLineCount,
  getDBVersion,
  app: {
    version,
    name,
    homepage
  }
};
