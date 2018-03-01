const http = require('http')
const router = require('./router.js')

module.exports = class _server {
	constructor(opts) {
		this.router = new router(opts)
		this.router.register(this)
	}
	start(portNumber) {
		const server = http.createServer((req, res) => {
			console.log(req.url)
			res.writeHead(200, {'Content-Type': 'text/plain' })
			res.end('OK')
		})

		server.listen(8888, () => {
			console.log('Listening at 8888')
		})
	}
}


