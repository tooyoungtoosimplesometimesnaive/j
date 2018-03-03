const J = require('../server.js')
const R = require('../router.js')

console.log(J)

const server = new J(new R())
server.start(12)
