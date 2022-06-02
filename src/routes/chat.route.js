const express = require("express");
// const {
//   storeMessage,
//   delteAllMessagesByUserId,
//   deleteMessage,
//   getAllMessagesByUserId,
// } = "../controller/chat.controller";

const chatController = require("../controller/chat.controller");

const chatRouter = express.Router();

chatRouter.post("/:user", async (req, res) => {
  try {
    const { user } = req.params;
    let { message, timestamp, isSent } = req.query;

    message = message || req.body.message;
    timestamp = timestamp || req.body.timestamp;
    isSent = isSent || req.body.isSent;

    const response = await chatController.storeMessage(
      message,
      isSent,
      timestamp,
      user
    );

    res.status(response.status).json(response);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      status: 500,
      message: "INTERNAL_SERVER_ERROR",
      errors: [e.message],
      messageId: "",
    });
  }
});

chatRouter.get("/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const { limit, start } = req.query;
    const response = await chatController.getAllMessagesByUserId(
      user,
      limit,
      start
    );
    res.status(response.status).json(response);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      status: 500,
      message: "INTERNAL_SERVER_ERROR",
      errors: [e.message],
      messageId: "",
    });
  }
});

chatRouter.delete("/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const response = await chatController.delteAllMessagesByUserId(user);
    res.status(response.status).json(response);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      status: 500,
      message: "INTERNAL_SERVER_ERROR",
      errors: [e.message],
      messageId: "",
    });
  }
});

chatRouter.delete("/:user/:msgId", async (req, res) => {
  try {
    const { user, msgId } = req.params;
    const response = await chatController.deleteMessage(msgId);
    res.status(response.status).json(response);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      status: 500,
      message: "INTERNAL_SERVER_ERROR",
      errors: [e.message],
      messageId: "",
    });
  }
});
module.exports = chatRouter;
