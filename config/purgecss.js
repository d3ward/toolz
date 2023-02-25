const { PurgeCSS } = require('purgecss')
const path = require('path')
const config = require('./config')
const fs = require('fs')
const chalk = require('chalk')
const pages = config.pages
const options = pages.map((page) => {
	const css = path.join(config.build, `css/${page}.css`)
	const content = [
		path.join(config.build, `${page}.html`),
		path.join(config.build, `js/${page}.js`)
	]
	return {
		css: [css],
		content: content
	}
})

Promise.all(options.map((option) => new PurgeCSS().purge(option))).then(
	(results) => {
		results.forEach((result, i) => {
			const css = result[0].css
			const cssFile = path.join(config.build, `css/${pages[i]}.css`)
			console.log(chalk.green(`File: ${cssFile}`))
			console.log(
				`Original size: ${(
					fs.statSync(path.join(config.build, `css/${pages[i]}.css`))
						.size / 1024
				).toFixed(2)}KB`
			)
			console.log(`Optimized size: ${(css.length / 1024).toFixed(2)}KB`)
			fs.writeFileSync(cssFile, css)
		})
	}
)
