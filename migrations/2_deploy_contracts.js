const ColorMigrations = artifacts.require("Color");
const ImageMigrations = artifacts.require("Image");

module.exports = function(deployer) {
  deployer.deploy(ColorMigrations);
  deployer.deploy(ImageMigrations);
};
