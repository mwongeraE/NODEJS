var express = require("express")

var app = express()

var port = 4330

//connect to the database
var mongoose = require("mongoose")
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/node-demo")

var

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.listen(port, () => {
  console.log("Server listening on port " + port)
})
