const { lineToObject, input, testString } = require("./common");

const escapeStringRegexp = require("escape-string-regexp");
let egrep = require("@apexearth/egrep");

const regex = new RegExp(escapeStringRegexp(testString));

let stream = egrep({
  pattern: regex,
  files: [input],
  recursive: true
});
stream.on("data", data => {
  console.log(lineToObject(data.line));
});
