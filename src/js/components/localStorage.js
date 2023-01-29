export class LocalStorageManager {
	constructor(name) {
		this.LS = null
		this.name = name
		this.checkLS()
		this.init(name)
	}
	clearAll() {
		this.LS.clear()
	}
	checkLS() {
		if (window && window.localStorage) {
			this.LS = window.localStorage
			// console.log('localStorage is there?')
		} else {
			console.log('localStorage is there?')
		}
	}
	init(name) {
		if (this.LS) {
			if (this.LS[name]) {
				this.data = JSON.parse(this.LS[name])
			} else {
				this.data = {}
			}
		}
	}

	set(uri, data) {
		this.data[uri] = data
		if (this.LS) {
			this.LS[this.name] = JSON.stringify(this.data)
		}
	}

	get(uri) {
		if (this.data[uri]) {
			return this.data[uri]
		}
		return false
	}
}
