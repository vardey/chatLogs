const { v4: uuidv4 } = require("uuid");
const Message = require("../../db/mongodb/schema/message");

const storeMessage = async (message, isSent, timestamp, userId) => {
  try {
    if (!message || !timestamp || isSent === undefined || !userId) {
      return {
        success: false,
        message: "BAD_REQUEST",
        error: ["invalid parameters"],
        status: 400,
      };
    }

    const messageId = uuidv4();
    await Message.create({ message, timestamp, isSent, userId, messageId });
    return {
      success: true,
      status: 200,
      messageId,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      status: 500,
      message: "INTERNAL_SERVER_ERROR",
      errors: [e.message],
      messageId: "",
    };
  }
};

const delteAllMessagesByUserId = async (userId) => {
  try {
    if (!userId) {
      return {
        success: false,
        message: "BAD_REQUEST",
        error: ["invalid parameters"],
        status: 400,
      };
    }

    await Message.deleteMany({ userId });
    return {
      success: true,
      status: 200,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      status: 500,
      message: "INTERNAL_SERVER_ERROR",
      errors: [e.message],
    };
  }
};

const deleteMessage = async (messageId) => {
  try {
    if (!messageId) {
      return {
        success: false,
        message: "BAD_REQUEST",
        error: ["invalid parameters"],
        status: 400,
      };
    }
    await Message.deleteOne({ messageId });
    return {
      success: true,
      status: 200,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      status: 500,
      message: "INTERNAL_SERVER_ERROR",
      errors: [e.message],
    };
  }
};

const getAllMessagesByUserId = async (userId, limit = 10, start) => {
  try {
    if (!userId) {
      return {
        success: false,
        message: "BAD_REQUEST",
        error: ["invalid parameters"],
        status: 400,
      };
    }
    const filter = { userId };
    if (start) {
      filter.timestamp = { $gte: start };
    }
    const data = await Message.find(filter)
      .sort({ timestamp: -1 })
      .limit(limit);
    return { status: 200, success: true, data };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      status: 500,
      message: "INTERNAL_SERVER_ERROR",
      errors: [e.message],
    };
  }
};

module.exports = {
  getAllMessagesByUserId,
  deleteMessage,
  delteAllMessagesByUserId,
  storeMessage,
};
