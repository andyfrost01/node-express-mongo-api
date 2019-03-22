let mongoose = require("mongoose");
let Stream = require("../models/stream");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);
describe("Streams", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Stream.remove({}, err => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET stream", () => {
    it("it should GET all the streams", done => {
      chai
        .request(server)
        .get("/stream")
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
describe("/POST stream", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Stream.remove({}, err => {
      done();
    });
  });
  it("it should create a stream and return the new stream object", done => {
    let stream = {
      user: "1",
      session: "123456789",
      stream: "123456"
    };
    chai
      .request(server)
      .post("/stream/add")
      .send(stream)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("user").eql("1");
        res.body.should.have.property("session").eql("123456789");
        res.body.should.have.property("stream").eql("123456");
        res.body.should.have.property("_id");
        res.body.should.have.property("start");
        done();
      });
  });
  it("it shouldn't create a stream if the user already has three streams and return a too many streams error", done => {
    let streams = [
      { user: "1", session: "123456789", stream: "123456" },
      { user: "1", session: "987654321", stream: "125622" },
      { user: "1", session: "123459876", stream: "567892" },
      { user: "1", session: "123459876", stream: "567892" }
    ];
    chai
      .request(server)
      .post("/stream/add")
      .send(streams[0])
      .end(() => {
        chai
          .request(server)
          .post("/stream/add")
          .send(streams[1])
          .end(() => {
            chai
              .request(server)
              .post("/stream/add")
              .send(streams[2])
              .end(() => {
                chai
                  .request(server)
                  .post("/stream/add")
                  .send(streams[3])
                  .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a("string");
                    res.body.should.be.eql("Too many streams");
                    done();
                  });
              });
          });
      });
  });
});

/*
 *  Test the /DELETE route
 */

describe("/DELETE stream", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Stream.remove({}, err => {
      done();
    });
  });
  it("it should delete a stream and return success message", done => {
    let stream = new Stream({
      _id: "5c950d7f5e859a0018c63faf",
      user: "1",
      session: "123456789",
      stream: "123456",
      start: "2019-03-22T16:29:51.714Z",
      __v: 0
    });
    stream.save((err, book) => {
      let streamToBeDeleted = {
        id: "5c950d7f5e859a0018c63faf"
      };
      chai
        .request(server)
        .delete("/stream")
        .send(streamToBeDeleted)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("string");
          res.body.should.be.eql("stream deleted");
          done();
        });
    });
  });
  it("it should fail to delete a stream and return no valid stream message", done => {
    let streamToBeDeleted = {
      id: "5c950ef15ed139001846afbd"
    };
    chai
      .request(server)
      .delete("/stream")
      .send(streamToBeDeleted)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("string");
        res.body.should.be.eql("no valid stream");
        done();
      });
  });
});
