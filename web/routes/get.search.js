const geoplanet = require("../../api/find");

module.exports = app => {
  // EXACT Basic Search (GET)
  // Supports single key/value options.
  app.get("/search/exact/:key/:query", async (req, res) => {
    const obj = {};
    obj[req.params.key] = req.params.query;

    // Set some headers
    res.setHeader("X-Search-Method", "Exact");
    res.setHeader("X-Search-Type", "Basic");

    // Generate and send the response
    res.status(200).json(await geoplanet(obj, true));
  });

  // Basic Search (GET)
  // Supports single key/value options.
  app.get("/search/:key/:query", async (req, res) => {
    const obj = {};
    obj[req.params.key] = req.params.query;

    // Set some headers
    res.setHeader("X-Search-Method", "Contains");
    res.setHeader("X-Search-Type", "Basic");

    // Generate and send the response
    res.status(200).json(await geoplanet(obj, false));
  });
};
