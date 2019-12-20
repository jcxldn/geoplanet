// Load only the bits of lodash that we need
const _ = require("lodash/collection")

const grep = require("./grep")

module.exports = async (filter, exact = false) => {
    let cmd = "matchContaining"
    if (exact) cmd = "matchExact"

    const value1 = filter[Object.keys(filter)[0]]

    const arr = await grep[cmd](value1)
    
    if (exact) return _.filter(arr, filter)

    // We only filter includes here as the exact filter will take care of itself
    return _.filter(arr, (i) => i.toString().includes(filter))
}
