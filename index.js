const fs = require("fs");

async function parse() {
  fs.readFile("D:/geoplanet_data_7.10.0/geoplanet_places_7.10.0.tsv", function(
    err,
    data
  ) {
    //console.log(JSON.stringify(data.toString().split("\n")));
    /*fs.writeFile(
      "s.json",
      JSON.stringify(data.toString().split("\n")),
      function(err) {
        console.log("done!");
      }
    );*/
    let out = [];

    const arr_lines = data.toString().split("\n");
    console.log(arr_lines.length);
    // Start at position one to avoid the header
    for (var i = 1; i < arr_lines.length; i++) {
      // 15k items =  512MB

      console.log(out.length);
      if (out.length > 100000) {
        console.log("SAVING...");
        fs.appendFileSync("2s_arr.json", JSON.stringify(out));
        out = [];
        console.log("NEW LEN 0");
      }

      const arr_place = arr_lines[i].split("\t");
      out.push({
        id: arr_place[0],
        country: arr_place[1].replace(/"/g, ""), // Remove the inner quotation marks
        name: arr_place[2].replace(/"/g, ""),
        language: arr_place[3],
        type: arr_place[4],
        parent: arr_place[5]
      });
    }
    /*console.log(
      data
        .toString()
        .split("\n")[0]
        .split("\t")
    );

    const a = data
      .toString()
      .split("\n")[1]
      .split("\t");
    console.log(a);
    let obj = {
      id: a[0],
      country: a[1].replace(/"/g, ""), // Remove the inner quotation marks
      name: a[2].replace(/"/g, ""),
      language: a[3],
      type: a[4],
      parent: a[5]
    };
    console.log(obj);*/
    fs.appendFileSync("2s_arr.json", JSON.stringify(out));
  });
}

parse();
