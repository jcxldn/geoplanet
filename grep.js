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

module.exports = testString => {
  const regex = new RegExp(escapeStringRegexp(testString));

  let stream = egrep({
    pattern: regex,
    files: ["./data/geoplanet_places_7.10.0.tsv"],
    recursive: true
  });

  const output = [];
  stream.on("data", data => output.push(lineToObject(data.line)));

  return new Promise((resolve, reject) => {
    stream.on("close", () => resolve(output));
    stream.on("error", error => reject(error));
  });
};

module.exports("Bank Underground Station").then(i => {
  console.log(i);
});
