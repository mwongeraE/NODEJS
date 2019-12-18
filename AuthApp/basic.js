'use strict'
var express = require("express")
var app = express()
var basicAuth = require('basic-auth')

var auth = function (req, res, next) {
  var user = basicAuth(req)
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization require')
    res.sendStatus(401)
    return
  }
  if (user.name === 'Evans' && user.pass === '12345') {
    next()
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Requires')
    res.sendStatus(401)
    return
  }
}

app.get("/auth", auth, function (req, res) {
  res.send("This page is authenticated")
})

app.listen(3030)
console.log("app running on localhost:3030")
