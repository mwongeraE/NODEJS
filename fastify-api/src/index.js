//Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})

//require external modules
const mongoose = require('mongoose')

//Import routes
const routes = require('./routes')

//Import swagger options
const swagger = require('./config/swagger')

//Register swagger
fastify.register(require('fastify-swagger'), swagger.options)

//Connect to DB
mongoose.connect('mongodb://localhost/mycargarage', { useNewUrlParser: true }) 
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.log(err))

//loop over our routes array to initialise them with Fastify
routes.forEach((route, index) => {
    fastify.route(route)
})


//Run the server
const start = async () => {
    try {
        await fastify.listen(3040)
        fastify.swagger()
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()


