const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const mongoose = require('mongoose')

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise
const auth = require('./auth')
const routes = require ('./routes')
const app = express()

//Configure our app
app.use(cors())
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'ussdone', cookie: { maxAge: 60000}, resave: false, saveUninitialized: false}))
app.use('/', routes(app))
app.use(auth)

//Configure Mongoose
mongoose.connect('mongodb://localhost/ussdalfar', {useNewUrlParser: true})
mongoose.set('debug', true)
var db = mongoose.connection


//Handle mongo error
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function() {
    //we are connected
})

//Models and routes
//require('./models/Users')
app.use(require('./routes'))

//Server
const server = app.listen(3611, function() {
    console.log('ready on port %d', server.address().port)
})