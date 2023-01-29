const path = require("path");
module.exports = {
  	// Source files path
  	src: path.resolve(__dirname, "../src"),
  	// Production build files path
  	build: path.resolve(__dirname, "../dist"),
  	// Static files. It will be copied in build process
  	public: path.resolve(__dirname, "../src"),
	// Static files. It will be copied in build process
	pages: path.resolve(__dirname, "../src/pages"),
};