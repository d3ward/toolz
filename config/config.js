const path = require("path");
module.exports = {
  	// Source files path
  	src: path.resolve(__dirname, "../src"),
  	// Production build files path
  	build: path.resolve(__dirname, "../dist"),
  	public: path.resolve(__dirname, "../src"),
	pages: ['index', 'fontlist', 'units', 'adblock', '404'],
};