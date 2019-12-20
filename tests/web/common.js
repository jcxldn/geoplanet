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

const post = (path, data, nest) => {
  it(`POST ${path}`, done => {
    chai
      .request(express)
      .post(path)
      .set("Content-Type", "application/json")
      .send(data)
      .end((err, res) => nest(done, res, err));
  });
};

module.exports = {
  get,
  post
};
