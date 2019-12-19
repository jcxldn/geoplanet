const { lineToObject, input, testString } = require("./common");

const shell = require("shelljs");

const out_arr = shell.grep(testString, input).stdout.split("\n");

out_arr.pop(1); // pop the last element as it is an empty line
out_arr.forEach(line => {
  //console.log(line.split("\t"));
  console.log(lineToObject(line));
});
