const process = require("process");

const productionMode = process.env.NODE_ENV === "production";

module.exports = productionMode
  ? require("./src/production.config")
  : require("./src/dev.config");
