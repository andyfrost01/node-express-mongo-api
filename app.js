const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const router = require("./routes");

const config = require("./config");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://mongo:27017/docker-node-mongo-api", {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(router);

app.listen(config.port, () => console.log(`Server running on ${config.port}`));

//export for testing
module.exports = app;
