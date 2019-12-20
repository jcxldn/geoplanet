const fs = require("fs-extra");
const s = require("showdown");
const c = require("cheerio");
const h = require("highlight.js");

const { getDBVersion, app: p } = require("../../api/helpers");

module.exports = app => {
  app.set("views", "web/views");

  app.get("/", async (req, res) => {
    // Load the README
    const readme = (await fs.readFile("README.md")).toString("utf8");

    // Convert it to HTML
    const converter = new s.Converter();
    const html = converter.makeHtml(readme);

    // Load the HTML into cheerio (jQuery for node)
    const $ = c.load(html);

    // Add some extra status badges to reflect the local instance
    $("img")
      .last()
      .append(
        `<br><br><img src='https://img.shields.io/badge/instance-orange'>\n<img src='https://img.shields.io/badge/version-${
          p.version
        }-blue'>\n<img src='https://img.shields.io/badge/db%20version-${getDBVersion()}-blue'>`
      );

    // -----------------------------------
    // Run JavaScript Syntax Highlighting
    // -----------------------------------

    // Run highlight.js over each JS code block
    $(".js").each((i, e) => {
      // In this block...
      // Get the original data
      const data = e.firstChild.data;
      // Highlight it
      const highlighted = h.highlight("js", data, true).value;
      // Overwrite the old data with the highlighted one
      $(".js")
        .eq(i)
        .html(highlighted);
    });

    // Send the final data to the client
    res.status(200).render("index.ejs", { output: $.html() });
  });
};
