const mongoose = require("mongoose");

const message = require("../model/message");

const Schema = mongoose.Schema;

const messageSchema = new Schema(message);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
