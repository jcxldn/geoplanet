const chai = require("chai");
const chaiHttp = require("chai-http");

const { get } = require("./common");

chai.use(chaiHttp);
chai.should();

describe("Web", () => {
  describe("Basic Search (GET)", () => {
    get("/search/exact/id/1", (done, res, err) => {
      // General results
      res.should.have.status(200);
      chai.expect(res.body).to.be.an("array");

      // Headers
      chai.expect(res.header["x-search-method"]).to.eql("Exact");
      chai.expect(res.header["x-search-type"]).to.eql("Basic");

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

    get("/search/name/London", (done, res, err) => {
      // General results
      res.should.have.status(200);
      chai.expect(res.body).to.be.an("array");

      // Headers
      chai.expect(res.header["x-search-method"]).to.eql("Contains");
      chai.expect(res.header["x-search-type"]).to.eql("Basic");

      // We know with this DB that it will return >500 results.
      chai.expect(res.body.length).to.be.greaterThan(500);

      // end test
      done();
    });

    get("/search/no/results", (done, res, err) => {
      // General results
      res.should.have.status(200);
      chai.expect(res.body).to.be.an("array");

      // Headers
      chai.expect(res.header["x-search-method"]).to.eql("Contains");
      chai.expect(res.header["x-search-type"]).to.eql("Basic");

      chai.expect(res.body.length).to.eql(0);
      done();
    });
  });
});
