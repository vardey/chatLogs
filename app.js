const express = require("express");
const cors = require("cors");
const chatLogs = require("./src/routes/index");
const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/v1", chatLogs);

module.exports = app;
