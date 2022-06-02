const express = require("express");
const chatRouter = require("./chat.route");

const chatLogs = express.Router();

chatLogs.use("/chatlogs", chatRouter);

module.exports = chatLogs;
