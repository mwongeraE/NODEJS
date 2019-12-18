//This is the root query to the server

const graphql = require('graphql')
const PaintingType = require('./PaintingType')
const Painting = require('./../models/painting')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        painting: {
            type: PaintingType,
            args: { id: { type: GraphQLString}},
            resolve(parent, args) {
                return Painting.findById(args.id)
                //Logic for serving data
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})