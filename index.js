require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const app = require("./app");

let server;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    server = app.listen(process.env.PORT, (err) => {
      if (err) {
        console.error("Starting server failed!!!", process.env.PORT, err);
        process.exit(1);
      }
      const { port } = server.address();
      console.log(`Server running on PORT ${port}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  // sendSlackMessage(JSON.stringify({ error: error }));

  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  // sendSlackMessage("SIGTERM received");

  if (server) {
    server.close();
  }
});
