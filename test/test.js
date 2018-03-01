const J = require('../server.js')


console.log(J)

const opts = {
	'user' : '/user',
	'item' : '/item'
}

const server = new J(opts)
server.start(12)
