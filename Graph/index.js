const express = require ('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const bodyParser = require ('body-parser')
const cors = require('cors')

import schema from "./graphql/"

const app = express()
const PORT = process.env.PORT || "3000"
const db = "mongodb://graphuser:meru45@ds245132.mlab.com:45132/mongojr"


//Connect to MongoDB with Mongoose
mongoose
    .connect(
        db,
        {
            useCreateIndex: true,
            useNewUrlParser: true
        }
    )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    graphqlHTTP({
        schema,
        graphiql: true
    })
)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))