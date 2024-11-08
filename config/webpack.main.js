const path = require('path')
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin')
const config = require('./config')

module.exports = {
	context: config.src,
	output: {
		path: config.build,
		clean: false,
		assetModuleFilename: 'assets/[name].[hash:8][ext]',
		publicPath: '/toolz/'
	},
	plugins: [
		new HtmlBundlerPlugin({
			entry: {
				// define pages here, the template file is relative to the webpack context
				index: 'index.ejs', // => dist/index.html
				fontlist: 'fontlist.ejs', // => dist/fontlist.html
				units: 'units.ejs', // => dist/units.html
				adblock: {
					import: 'adblock.ejs',
					data: {
						// pass external data into template
						adblock_compatibility: require(path.join(
							config.src,
							'./data/adblock_compatibility.json'
						))
					}
				},
				404: '404.ejs' // => dist/404.html
			},
			js: {
				filename: 'js/[name].[contenthash:8].js' // JS output filename
			},
			css: {
				filename: 'css/[name].[contenthash:8].css' // CSS output filename
			},
			preprocessor: 'ejs', // use EJS compiler
			preprocessorOptions: {
				root: config.src
			},
			loaderOptions: {
				sources: [
					{
						// allow to handle an source image in the 'content' attribute of the 'meta' tag
						tag: 'meta',
						attributes: ['content'],
						// when the 'property' attribute contains one of: 'og:image', 'twitter:image', etc.
						filter: ({ attributes }) =>
							attributes.itemprop === 'image' ||
							attributes.name === 'twitter:image' ||
							attributes.property === 'og:image'
					}
				]
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'css-loader', // Turn css into commonjs
					'sass-loader' // Turn scss into css
				]
			}
		]
	}
}
