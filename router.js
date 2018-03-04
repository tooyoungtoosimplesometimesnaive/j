module.exports = class router {
	constructor() {
		this.routes = {
		}
	}

	get(endpoint, callback) {
		this.request('GET', endpoint, callback)
	}

	request(method, endpoint, callback) {
		this.routes[endpoint] = {
			method,
			callback
		}
	}
}

