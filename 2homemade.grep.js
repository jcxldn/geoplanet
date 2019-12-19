const { lineToObject, input, testString } = require("./common");

const fs = require("fs");
const es = require("event-stream");

const escapeStringRegexp = require("escape-string-regexp");
const regex = new RegExp(escapeStringRegexp(testString));

//fs.readFile(input, "utf8", (err, contents) => {});

var s = fs
  .createReadStream(input, "utf8")
  .pipe(es.split())
  .pipe(
    es.mapSync(line => {
      if (regex.test(line)) console.log(lineToObject(line));
    })
  );
