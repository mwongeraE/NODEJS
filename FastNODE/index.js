//Import express
let express = require('express')

//Import body parser
let bodyParser = require('body-parser')

//Import Mongoose
let mongoose = require('mongoose')

//Initialize the app
let app = express()

//import routes
let apiRoutes = require("./api-routes")

//Setup server port
var port = process.env.PORT || 8009

//Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

//Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/fastnode')

var db = mongoose.connection

//send message for default URL
app.get('/', (req, res) => res.send('Hello world with express'))

//Use Api routes in the App
app.use('/api', apiRoutes)

//Launch app to listen to specified port
app.listen(port, function () {
    console.log('Running FastNode on port ' + port)
})