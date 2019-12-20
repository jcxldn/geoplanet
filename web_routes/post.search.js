const geoplanet = require("../find");

module.exports = app => {
  // EXACT Advanced search (POST)
  // Filter options specified in POST body.
  app.post("/search/exact", async (req, res) => {
    // Set some headers
    res.setHeader("X-Search-Method", "Exact");
    res.setHeader("X-Search-Type", "Advanced");

    // Generate and send the response
    res.status(200).json(await geoplanet(req.body, true));
  });

  // Advanced search (POST)
  // Filter options specified in POST body.
  app.post("/search", async (req, res) => {
    // Set some headers
    res.setHeader("X-Search-Method", "Contains");
    res.setHeader("X-Search-Type", "Advanced");

    // Generate and send the response
    res.status(200).json(await geoplanet(req.body, false));
  });
};
