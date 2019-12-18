const express = require ('express')

const SERVER = require ('./config')
const routes = require ('./routes')

const { port, host } = SERVER

const app = express()

app.use('/', routes(app))

app.listen(port, host, () => {
    console.log(`USSD successfully started at: ${host}:${port}`)
})



