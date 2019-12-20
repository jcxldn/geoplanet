const fs = require("fs-extra");
const s = require("showdown");
const c = require("cheerio");
const h = require("highlight.js");

module.exports = app => {
  app.set("views", "web/views");

  app.get("/", async (req, res) => {
    // Load the README
    const readme = (await fs.readFile("README.md")).toString("utf8");

    // Convert it to HTML
    const converter = new s.Converter();
    const html = converter.makeHtml(readme);

    // --------------------------------
    // Run JavaScript Syntax Highlighting

    // Load the HTML into cheerio (jQuery for node)
    const $ = c.load(html);

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
