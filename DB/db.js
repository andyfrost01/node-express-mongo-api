const Stream = require("../models/stream");
const User = require("../models/user");

//create stream
const createStream = stream => {
  return new Promise((resolve, reject) => {
    const newStream = new Stream({ ...stream });
    newStream
      .save()
      .then(() => {
        return resolve(newStream);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

//create user
const createUser = user => {
  return new Promise((resolve, reject) => {
    const newUser = new User({ ...user });
    newUser
      .save()
      .then(() => {
        return resolve(newUser);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

//delete stream
const deleteStream = id => {
  return new Promise((resolve, reject) => {
    Stream.deleteOne({ _id: id })
      .then(response => {
        if (response.deletedCount > 0) {
          return resolve("stream deleted");
        } else {
          return reject("no valid stream");
        }
      })
      .catch(err => {
        return reject(err);
      });
  });
};

//delete user
const deleteUser = user => {
  return new Promise((resolve, reject) => {
    User.deleteOne({ user: user })
      .then(response => {
        if (response.deletedCount > 0) {
          return resolve("user deleted");
        } else {
          return reject("no valid user");
        }
      })
      .catch(err => {
        return reject(err);
      });
  });
};

//get stream count
const getStreamCount = user => {
  return new Promise((resolve, reject) => {
    Stream.countDocuments({ user: user })
      .then(streamCount => {
        if (streamCount < 3) {
          return resolve(streamCount);
        } else {
          return reject("Too many streams");
        }
      })
      .catch(err => {
        return reject(err);
      });
  });
};

//export
module.exports = {
  createStream,
  createUser,
  getStreamCount,
  deleteStream,
  deleteUser
};
