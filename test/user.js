let mongoose = require("mongoose");
let User = require("../models/user");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Users", () => {
  beforeEach(done => {
    //Before each test we empty the database
    User.remove({}, err => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET user", () => {
    it("it should GET all the users", done => {
      chai
        .request(server)
        .get("/user")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});

/*
 * Test the /POST route
 */
describe("/POST user", () => {
  it("it should create a user and return the new users object", done => {
    let user = {
      user: "1",
      email: "test1@test.com"
    };
    chai
      .request(server)
      .post("/user/add")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("user").eql("1");
        res.body.should.have.property("email").eql("test1@test.com");
        done();
      });
  });
});

/*
 *  Test the /DELETE route
 */

describe("/DELETE user", () => {
  it("it should delete a user and return success message", done => {
    let user = new User({ user: "1", email: "test1@test.com" });
    user.save((err, book) => {
      let userToBeDeleted = {
        user: "1"
      };
      chai
        .request(server)
        .delete("/user")
        .send(userToBeDeleted)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("string");
          res.body.should.be.eql("user deleted");
          done();
        });
    });
  });
});
