const main = require('./webpack.main')
const { merge } = require('webpack-merge')
const config = require('./config')

module.exports = merge(main, {
	mode: 'development',
	devServer: {
		static: {
			directory: config.dist,
			publicPath: '/'
		},
		compress: true,
		port: 3000,
		hot: true,
		open: '/toolz/',
		historyApiFallback: true
	}
})
