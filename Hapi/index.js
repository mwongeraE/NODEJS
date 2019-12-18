const hapi = require('hapi')
const mongoose = require('mongoose')
const { graphqlHapi, graphiqlHapi} = require('apollo-server-hapi')

const schema = require('./graphql/schema')
//Fetch all paintings from the database
const Painting = require('./models/painting')

const server = hapi.server({
    port: 4000,
    host: 'localhost'
})

//database mlab
mongoose.connect('mongodb://evans:world123@ds145183.mlab.com:45183/hapi')

mongoose.connection.once('open', () => {
    console.log('connected to database')
})


const init = async function () {
    
    await server.register([
        Inert,

        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: 'Paintings API Documentation',
                    version: package.version
                }
            }
        }
    ])

    await server.register({
        plugin: graphqlHapi,
        options: {
            path: '/graphql',
            graphqlOptions: {
                schema
            },

            route: {
                cors: true
            }
        }
    })
    
    await server.register({
        plugin: graphiqlHapi,
        options: {
            path: '/graphiql',
            graphiqlOptions: {
                endpointURL: '/graphql'
            },

            route: {
                cors: true
            }
        }
    })

    
    server.route([

    {
        method: 'GET',
        path: '/api/v1/paintings',
        config: {
            description: 'Get all the paintings',
            tags: ['api', 'v1', 'painting']
        },
        handler: (req, reply) => {
            return Painting.find()
        }
    },
    {
        method: 'POST',
        path: '/api/v1/paintings',
        config: {
            description: 'Get a specific painting by ID',
            tags: ['api', 'v1','painting']
        },

        handler: (req, reply) => {
            const { name, url, technique } = req.payload
            const painting = new Painting({
                name,
                url,
                technique
            })

            return painting.save()
        }
    }
])
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
}

init()