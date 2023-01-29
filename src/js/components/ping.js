// See LICENSE for usage information

// The following lines allow the ping function to be loaded via commonjs, AMD,
// and script tags, directly into window globals.
// Thanks to https://github.com/umdjs/umd/blob/master/templates/returnExports.js
;(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory()
	} else {
		root.ping = factory()
	}
})(this, function () {
	/**
	 * Creates and loads an image element by url.
	 * @param  {String} url
	 * @return {Promise} promise that resolves to an image element or
	 *                   fails to an Error.
	 */
	function request_image(url) {
		return new Promise(function (resolve, reject) {
			var img = new Image()
			img.onload = function () {
				resolve(img)
			}
			img.onerror = function () {
				reject(url)
			}
			img.src =
				url +
				'?random-no-cache=' +
				Math.floor((1 + Math.random()) * 0x10000).toString(16)
		})
	}

	/**
	 * Pings a url.
	 * @param  {String} url
	 * @param  {Number} multiplier - optional, factor to adjust the ping by.  0.3 works well for HTTP servers.
	 * @return {Promise} promise that resolves to a ping (ms, float).
	 */
	function ping(url, multiplier) {
		return new Promise(function (resolve, reject) {
			var start = new Date().getTime()
			var response = function () {
				var delta = new Date().getTime() - start
				delta *= multiplier || 1
				resolve(delta)
			}
			request_image(url).then(response).catch(console.log(response))

			// Set a timeout for max-pings, 5s.
			setTimeout(function () {
				reject(Error('Timeout'))
			}, 5000)
		})
	}

	return ping
})
