const express = require("express");

const { getLineCount, getDBVersion, app: p } = require("./helpers");

// Nice console output that we can disable during tests
const console = require("prefix-logger")("geoplanet.web");
require("colors");

console.log("Starting...");

const app = express();

app.use(express.json());

// Register custom middleware
app.use((req, res, next) => {
  // Custom X-Powered-By Header
  res.setHeader("X-Powered-By", `${p.name}/${p.version} (${p.homepage})`);

  // Enable CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

require("./web_routes")(app);

// ---------- | Run before webserver start
let count = 0;
getLineCount().then(i => {
  console.log("line count recieved!".grey);
  count = i;
  app.emit("ready");
});
// ----------

app.get("/", (req, res) => {
  res.status(200).json({
    service: "geoplanet",
    version: p.version,
    db: { count, version: getDBVersion() }
  });
});

app.on("ready", () => {
  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log(`express started on port ${port}`.yellow);
  console.log("db count: " + count);
  console.log("db version: " + getDBVersion());
});

// For testing
module.exports = app;
