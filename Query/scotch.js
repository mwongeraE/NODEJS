//URL Parameters
/*
using http://example.com/api/users?id=4&token=sdfa3&geo=us as our url
This is most seen in requesting information from an API

URL parameters are grabbed using req.param.variable_name  --Requests

POST Parametrs are grabbed using req.body.variable_name
*/

var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
var port = process.env.PORT || 8080

//routes will go here
app.get('/api/users', function(req, res) {
    var user_id = req.param('id')
    var token = req.param('token')
    var geo = req.param('geo')

    res.send(user_id + ' ' + token + ' ' + geo)
})

/*
We can also name the parameter directly in the route itself
*/
app.get('/api/:version', function(req, res) {
    res.send(req.params.version)
})


app.listen(port)
console.log('Server started! At http://localhost: ' + port)

//Route Parameter Middleware
/*
Using Express param function to grab a specific parameter
Will run before the route is called
This can be used for validations(like checking if a user exists) or grabbing important 
about that user or item
*/

app.param('name', function(req, res, next, name) {
    //check if the user with that name exists
    //do some validations
    //add -dude to the name
    var modified = name + '-dude'

    //save name to the request
    req.name = modified

    next()
})

//http://localhost:8080/api/users/chris
app.get('/api/users/:name', function(req, res) {
    //the user was found and is available in req.user
    res.send('What is up ' + req.name + '!')
})

//Parameters sent with
app.post('/api/users', function(req, res) {
    var user_id = req.body.id
    var token = req.body.token
    var geo = req.body.geo

    res.send(user_id + ' ' + token + ' ' + geo)
})

/*
ussdMenu.args.phoneNumber
*/

