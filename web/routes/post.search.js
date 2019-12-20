const geoplanet = require("../../api/find");

module.exports = app => {
  // EXACT Advanced search (POST)
  // Filter options specified in POST body.
  app.post("/search/exact", async (req, res) => {
    // Set some headers
    res.setHeader("X-Search-Method", "Exact");
    res.setHeader("X-Search-Type", "Advanced");

    try {
      const data = JSON.parse(req.body);
      // Generate and send the response
      res.status(200).json(await geoplanet(data, true));
    } catch (e) {
      res.status(400).json({ message: "bad post body" });
    }
  });

  // Advanced search (POST)
  // Filter options specified in POST body.
  app.post("/search", async (req, res) => {
    // Set some headers
    res.setHeader("X-Search-Method", "Contains");
    res.setHeader("X-Search-Type", "Advanced");

    try {
      const data = JSON.parse(req.body);
      // Generate and send the response
      res.status(200).json(await geoplanet(data, false));
    } catch (e) {
      res.status(400).json({ message: "bad post body" });
    }
  });
};
