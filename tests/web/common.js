const chai = require("chai");

const express = require("../../web");

const get = (path, nest) => {
  it(`GET ${path}`, done => {
    chai
      .request(express)
      .get(path)
      .end((err, res) => nest(done, res, err));
  });
};

module.exports = {
  get
};
