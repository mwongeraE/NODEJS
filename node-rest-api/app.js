//Create web server using express
var express = require('express')

var app = express()

var port = process.env.PORT || 2808

var mongoose = require('mongoose')

var Product = require('./restapi/models/productModel')

var bodyParser = require('body-parser')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/onlinestore', { useNewUrlParser: true })

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

var routes = require('./restapi/routes/productRoutes')

routes(app)

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)

console.log('Online store - restful web services with nodejs started on: ' + port)
