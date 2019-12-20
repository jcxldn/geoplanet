// Load only the bits of lodash that we need
const _ = require("lodash/collection");

const grep = require("./grep");

module.exports = async (filter, exact = false) => {
  let cmd = "matchContaining";
  if (exact) cmd = "matchExact";

  const value1 = filter[Object.keys(filter)[0]];

  const arr = await grep[cmd](value1);

  // Exact filter
  if (exact) return _.filter(arr, filter);

  // Contains filter
  return _.filter(arr, i => {
    let valid = true;
    // For every item obj
    Object.keys(filter).forEach(k => {
      /* istanbul ignore else */
      if (filter[k] != undefined) {
        // Filter option exists
        if (!i[k].includes(filter[k])) {
          // Filter does not match, invalidate item object and exclude from filter
          valid = false;
        }
      }
    });
    return valid;
  });
};
