const fs = require("fs-extra");
const s = require("showdown");

module.exports = app => {
  app.set("views", "web/views");

  app.get("/", async (req, res) => {
    const readme = (await fs.readFile("README.md")).toString("utf8");

    const converter = new s.Converter();
    const output = converter.makeHtml(readme);

    res.status(200).render("index.ejs", { output });
  });
};
