const Koa = require('koa')
const mount = require('koa-mount')
const graphqlHTTP = require('koa-graphql')
const schema = require('./graphql/schema')
const initDB = require('./database')

const app = new Koa()

let port = 9001

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port)
})

initDB()

app.on('error', err => {
    log.error('server error', err)
})

app.use(mount('/graphql', graphqlHTTP ({
    schema: schema,
    graphiql: true
})))