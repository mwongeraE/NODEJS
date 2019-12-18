var express = require('express')
  , http = require('http')

//Make sure you keep this order
var app = express()
var server = http.createServer(app)
var io = require('socket.io').listen(server)

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index2.html')
})


io.on('connection', function(socket) {
  console.log('a user connected')
  socket.on('disconnect', function(){
    console.log('user disconnected')
  })
})

server.listen(3050, function() {
  console.log('listening on *:3050')
})
