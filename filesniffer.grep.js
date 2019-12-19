const { lineToObject, input, testString } = require("./common");

const { FileSniffer, asArray } = require("filesniffer");

const f = async () => {
  const matches = await FileSniffer.create()
    .path(input)
    .depth(1)
    .collect(asArray())
    .find(testString);

  matches.forEach(line => console.log(lineToObject(line.match)));
};

f();
