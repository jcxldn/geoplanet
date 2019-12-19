const { lineToObject, input, testString } = require("./common");

const fs = require("fs");
const es = require("event-stream");

//fs.readFile(input, "utf8", (err, contents) => {});

var s = fs
  .createReadStream(input, "utf8")
  .pipe(es.split())
  .pipe(
    es.mapSync(line => {
      if (line.includes(testString)) console.log(lineToObject(line));
    })
  );
