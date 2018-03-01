const http = require('http')
const router = require('./router.js')

const server = http.createServer((req, res) => {
	console.log(req.url)
	res.writeHead(200, {'Content-Type': 'text/plain' })
	res.end('OK')
})

server.listen(8888, () => {
	console.log('Listening at 8888')
})

