const chai = require("chai");

const find = require("../find");

chai.should();
describe("Find", () => {
  describe("Example 1", () => {
    it("London (contains)", done => {
      find({ name: "London", countryCode: "GB" }, false).then(data => {
        chai.expect(data).to.be.a("array");
        // Contains in this example returns over 250 results.
        chai.expect(data).to.have.lengthOf.greaterThan(250);

        // test Country Code results against our filter
        for (i = 0; i < data.length; i++) {
          chai.expect(data[i].countryCode).to.equal("GB");
          chai.expect(data[i].name).to.include("London");
        }

        done();
      });
    });

    it("London (exact)", done => {
      find({ name: "London", countryCode: "GB" }, true).then(data => {
        // Exact in this example contains only one result.
        chai.expect(data).to.have.lengthOf(1);

        // As we know what it should return, let's test against that
        chai.expect(data[0]).to.eql({
          id: "44418",
          countryCode: "GB",
          name: "London",
          langCode: "ENG",
          type: "Town",
          parentID: "23416974"
        });
        done();
      });
    });
  });
});
