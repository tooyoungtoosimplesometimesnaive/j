const Parser = require('./util/urlParser.js')

module.exports = class router {
	constructor() {
		this.routes = {
			'GET': [],
			'POST': []
		}
	}

	use(endpoint, files) {
		for (const f of files) {

			this.get(endpoint + f.relativePath, function(ctx) {
				ctx.contentType = f.contentType
				ctx.isFile = true
				ctx.filePath = f.absolutePath
			})

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

