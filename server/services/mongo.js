const mongoose = require("mongoose");
const config = require('../config');

mongoose.connect(config.MONGODB.URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);

mongoose.connection.once("disconnected", () => {
  console.log("Disconnected from MongoDB");
  process.exit(1);
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose disconnected through app termination");
    process.exit(0);
  });
});

module.exports = {
  connection: mongoose.connection
};
