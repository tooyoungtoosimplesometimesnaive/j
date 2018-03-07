const J = require('../server.js')
const R = require('../router.js')


const router = new R()
router.get('/', (ctx) => {
	ctx.body = `Hello this is home page.`
})

router.get('/user/:id', (ctx) => {
	ctx.body = `Hello this is user ${ctx.pathParam.id} page, with a=${ctx.queryParam.a}`
})

router.use('/', J.serveStatic('./static'))

const server = new J(router)
server.start(8888)
