const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
    console.log(request.url)
    response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})


//above application but with express
const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
    response.send('Hello from Express!')
}) 

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})

//express middlewares
const express = require('express')
const app = express()
app.use((request, response, next) => {
    console.log(request.header)
    next()
})

app.use((request, response, next) => {
    request.chance = Math.random()
    next()
})

app.get('/', (request, response) => {
    response.json({
        chance: request.chance
    })
})

app.listen(3000)


//Error handling
/*
the error handler function should be the last function added with app.use

The error handler has a next callback- it can be used to chain multiple error handlers
*/
const express = require('express')
const app = express()

app.get('/', (request, response) => {
    throw new Error('oops')
})

app.use((err, request, response, next) => {
    //log the error
    console.log(err)
    response.status(500).send('Something broke!')
})


//Rendering HTML

//Debugging express
/*
start server with DEBUG=express* node index.js
*/
