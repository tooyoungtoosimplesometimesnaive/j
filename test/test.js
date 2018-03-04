const J = require('../server.js')
const R = require('../router.js')

console.log(J)

const router = new R()
router.get('/', (ctx) => {
	ctx.statusCode = 200
	ctx.body = `Hello this is home page.`
})

console.log(router)
console.log(router.routes)

const server = new J(router)
server.start(8888)
