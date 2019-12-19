const egrep = require("@apexearth/egrep");
const escapeStringRegexp = require("escape-string-regexp");

function lineToObject(line) {
  const arr = line.split("\t");

  return {
    // ID
    id: arr[0],
    // ISO Country Code
    countryCode: arr[1].replace(/"/g, ""), // Remove the inner quotation marks
    // Name of place (utf8 it)
    name: arr[2].replace(/"/g, ""), //.encode('utf8'),
    // ISO Language Code
    langCode: arr[3],
    // [Place] Type
    type: arr[4],
    // Parent ID
    parentID: arr[5]
  };
}

module.exports = (input, testString) => {
  const output = [];

  const regex = new RegExp(escapeStringRegexp(testString));

  let stream = egrep({
    pattern: regex,
    files: [input],
    recursive: true
  });
  stream.on("data", data => {
    output.push(lineToObject(data.line));
  });
  return output;
};

module.exports(
  "D:/geoplanet_data_7.10.0/geoplanet_places_7.10.0.tsv",
  "London"
);
