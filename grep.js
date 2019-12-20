const egrep = require("@apexearth/egrep");
const escapeStringRegexp = require("escape-string-regexp");

const console = require("prefix-logger")("geoplanet.grep");
const colors = require("colors/safe");

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

const match = regex => {
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

const matchContaining = string => {
  console.log(colors.grey("match containing"));
  const regex = new RegExp(escapeStringRegexp(string));

  return match(regex);
};

const matchExact = string => {
  console.log(colors.grey("match exact"));
  const regex = new RegExp(`\\b${string}\\b`);

  return match(regex);
};

module.exports = {
  matchExact,
  matchContaining
};
