const path = require('path')
module.exports = {
	src: path.resolve(__dirname, '../src'),
	build: path.resolve(__dirname, '../dist'),
	public: path.resolve(__dirname, '../src'),
	pages: ['index', 'fontlist', 'units', 'adblock', '404']
}
