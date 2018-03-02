const process = require("process");

module.exports = function createConfig(outputDirectory) {

  const productionMode = process.env.NODE_ENV === "production";

  return productionMode
    ? require("./src/production.config")(outputDirectory)
    : require("./src/dev.config")(outputDirectory);

}


