const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, getDBVersion } = require("../../api/helpers");

const { get } = require("./common");

chai.use(chaiHttp);
chai.should();

describe("Web", () => {
  describe("Index (Showdown)", () => {
    get("/", (done, res, err) => {
      res.should.have.status(200);
      chai.expect(res).to.be.html;
      done();
    });
  });

  describe("Info Response", () => {
    get("/info", (done, res, err) => {
      res.should.have.status(200);
      chai.expect(res.body).to.be.an("object");
      chai.expect(res.body.service).to.eql("geoplanet");
      chai.expect(res.body.version).to.eql(app.version);
      chai.expect(res.body.db.count).to.be.a("number");
      chai.expect(res.body.db.version).to.eql(getDBVersion());
      done();
    });
  });

  describe("Routes", () => {
    get("/routes", (done, res, err) => {
      res.should.have.status(200);
      chai.expect(res.body).to.be.an("array");
      done();
    });
  });

  describe("Headers [CORS + X-Powered-By]", () => {
    get("/", (done, res, err) => {
      res.should.have.status(200);

      // CORS
      chai.expect(res).to.have.header("Access-Control-Allow-Origin", "*");
      chai
        .expect(res)
        .to.have.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );

      // X-Powered-By
      chai.expect(res).to.have.header("X-Powered-By");
      done();
    });

    get("/invalid", (done, res, err) => {
      res.should.have.status(404);

      // CORS
      chai.expect(res).to.have.header("Access-Control-Allow-Origin", "*");
      chai
        .expect(res)
        .to.have.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );

      // X-Powered-By
      chai.expect(res).to.have.header("X-Powered-By");
      done();
    });
  });

  // Other tests go here
});
