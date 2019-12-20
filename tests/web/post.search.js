const chai = require("chai");
const chaiHttp = require("chai-http");

const { post } = require("./common");

chai.use(chaiHttp);
chai.should();

describe("Web", () => {
  describe("Advanced Search (POST)", () => {
    describe("Valid JSON (HTTP 200)", () => {
      post("/search/exact", { id: "1" }, (done, res, err) => {
        // General results
        res.should.have.status(200);
        chai.expect(res.body).to.be.an("array");

        // Headers
        chai.expect(res.header["x-search-method"]).to.eql("Exact");
        chai.expect(res.header["x-search-type"]).to.eql("Advanced");

        // As this will only return one result we can hard match it
        chai.expect(res.body.length).to.eql(1);

        chai.expect(res.body[0]).to.eql({
          id: "1",
          countryCode: "ZZ",
          langCode: "ENG",
          name: "Earth",
          type: "Supername",
          parentID: "0"
        });

        // end test
        done();
      });

      post("/search", { name: "London" }, (done, res, err) => {
        // General results
        res.should.have.status(200);
        chai.expect(res.body).to.be.an("array");

        // Headers
        chai.expect(res.header["x-search-method"]).to.eql("Contains");
        chai.expect(res.header["x-search-type"]).to.eql("Advanced");

        // We know with this DB that it will return >500 results.
        chai.expect(res.body.length).to.be.greaterThan(500);

        // end test
        done();
      });
    });

    describe("Valid JSON, no results (HTTP 200)", () => {
      post("/search", { no: "results" }, (done, res, err) => {
        // General results
        res.should.have.status(200);
        chai.expect(res.body).to.be.an("array");

        // Headers
        chai.expect(res.header["x-search-method"]).to.eql("Contains");
        chai.expect(res.header["x-search-type"]).to.eql("Advanced");

        chai.expect(res.body.length).to.eql(0);
        done();
      });
    });

    describe("Invalid JSON (HTTP 400)", () => {
      post("/search/exact", "invalid_json", (done, res, err) => {
        res.should.have.status(400);
        chai.expect(res.body).to.be.an("object");
        chai.expect(res.body).to.eql({ message: "bad post body" });
        done();
      });

      post("/search", "invalid_json", (done, res, err) => {
        res.should.have.status(400);
        chai.expect(res.body).to.be.an("object");
        chai.expect(res.body).to.eql({ message: "bad post body" });
        done();
      });
    });
  });
});
