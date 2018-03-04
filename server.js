const http = require('http')

module.exports = class _server {
	constructor(_routes) {
		this.routes = _routes
		this.initServer()
	}

	initServer() {
		this.server = http.createServer((req, res) => {
			if (!this.routes[req.url]) {
				res.writeHead(404, {'Content-Type': 'text/plain'})
				res.end('Not Found')
				return
			}
			if (this.routes[req.url]['method'] != req.method) {
				res.writeHead(415, {'Content-Type': 'text/plain'})
				res.end('Mehtod Not Allowed')
				return
			}
			this.routes[req.url]['callback'](res);
		})
	}

	start(portNumber) {
		/*
		const server = http.createServer((req, res) => {
			console.log(req.url)
			console.log(req.method)
			res.writeHead(200, {'Content-Type': 'text/plain' })
			res.end('OK')
		})
		*/

		this.server.listen(portNumber, () => {
			console.log(`Listening at ${portNumber}`)
		})
	}

}


