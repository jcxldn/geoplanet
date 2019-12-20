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

    const $ = c.load(html);

    const write = [];
    // Run highlight.js over the code block
    $(".js").each((i, e) => {
      // found one!
      const data = e.firstChild.data;
      const highlighted = h.highlight("js", data, true).value;
      console.log(highlighted);
      $(".js")
        .eq(i)
        .html(highlighted);
    });
    //console.log(h.highlight("js", $(".js").text(), true));

    res.status(200).render("index.ejs", { output: $.html() });
  });
};
