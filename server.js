const http = require('http')

module.exports = class _server {
	constructor(_routes) {
		this.routes = _routes
	}
	start(portNumber) {
		const server = http.createServer((req, res) => {
			console.log(req.url)
			console.log(req.method)
			res.writeHead(200, {'Content-Type': 'text/plain' })
			res.end('OK')
		})

		server.listen(8888, () => {
			console.log('Listening at 8888')
		})
	}

}


