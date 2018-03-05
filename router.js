const Parser = require('./util/urlParser.js')

module.exports = class router {
	constructor() {
		this.routes = {
			'GET': [],
			'POST': []
		}
	}

	get(endpoint, callback) {
		this.request('GET', endpoint, callback)
	}

	request(method, endpoint, callback) {
		const r = Parser.register(endpoint)

		this.routes[method].push({
			...r,
			callback
		})
	}
}

