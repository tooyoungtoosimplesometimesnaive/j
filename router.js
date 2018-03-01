module.exports = class router {
	constructor(options) {
		this.opts = options
		console.log(options)
	}
	register(server) {
		console.log(Object.keys(this.opts))
		for (let k in Object.keys(this.opts)) {
			server[k] = function() {
				console.log('hello')
			}
		}
	}
}

