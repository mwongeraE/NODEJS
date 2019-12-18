const Koa = require('koa');
const bodyParser = require('koa-body')

const PORT = process.env.PORT || 9090

module.exports = new Koa()
    .use(bodyParser())
    .listen(PORT, () => console.log(`Simple service listening in port: ${PORT}`))