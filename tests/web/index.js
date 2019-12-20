const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, getDBVersion } = require("../../helpers");

const { get } = require("./common");

chai.use(chaiHttp);
chai.should();

describe("Web", () => {
  describe("Index Response", () => {
    get("/", (done, res, err) => {
      res.should.have.status(200);
      chai.expect(res.body).to.be.an("object");
      chai.expect(res.body.service).to.eql("geoplanet");
      chai.expect(res.body.version).to.eql(app.version);
      chai.expect(res.body.db.count).to.be.a("number");
      chai.expect(res.body.db.version).to.eql(getDBVersion());
      done();
    });
  });

  describe("CORS", () => {
    get("/", (done, res, err) => {
      res.should.have.status(200);

      chai.expect(res).to.have.header("Access-Control-Allow-Origin", "*");
      chai
        .expect(res)
        .to.have.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
      done();
    });

    get("/invalid", (done, res, err) => {
      res.should.have.status(404);

      chai.expect(res).to.have.header("Access-Control-Allow-Origin", "*");
      chai
        .expect(res)
        .to.have.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
      done();
    });
  });

  // Other tests go here
});
