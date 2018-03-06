const fs = require('fs')
const path = require('path')
const http = require('http')
const Parser = require('./util/urlParser.js')

module.exports = class _server {
	constructor(_router) {
		this.routes = _router.routes
		this.initServer()
	}

	initServer() {
		this.server = http.createServer((req, res) => {
			const p = new Parser(req.url)
			const endPoints = this.routes[req.method]
			let endPoint = null
			for (const e of endPoints) {
				if (p.urlPath.match(new RegExp(e.urlRegexPattern))) {
					endPoint = e
					break
				}
			}

			if (!endPoint) {
				res.writeHead(404, {'Content-Type': 'text/plain'})
				res.end('Not Found')
				return
			}
			/*
			if (this.routes[req.url]['method'] != req.method) {
				res.writeHead(415, {'Content-Type': 'text/plain'})
				res.end('Mehtod Not Allowed')
				return
			}
			*/
			const context = {}
			context.pathParam = {}
			context.queryParam = p.queryParams

			let i = 0
			for (const pParam of endPoint.path) {
				if (pParam.isVariable) {
					context.pathParam[pParam.name] = p.pathParams[i]
				}
				i++
			}

			endPoint['callback'](context)
			res.writeHead(200, {'Content-Type': 'text/plain'})
			res.end(context.body)
		})
	}

	static serveStatic(dir) {
		const staticFiles = []
		function walk(d) {
			if (!fs.lstatSync(d).isDirectory()) {
				console.log(d)
				staticFiles.push({
					path: d,
				})
				return
			}
			for (const _d of fs.readdirSync(d)) {
				walk(path.join(d, _d))
			}
		}
		walk(dir)
		return function(ctx) {
		}
	}

	start(portNumber) {
		this.server.listen(portNumber, () => {
			console.log(`Listening at ${portNumber}`)
		})
	}

}

