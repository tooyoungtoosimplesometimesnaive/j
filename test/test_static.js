const path = require('path')
const J = require('../server.js')

J.serveStatic(path.join(__dirname, '../static/'))

