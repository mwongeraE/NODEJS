var http = require('http')
//var dt = require('./Modules')
var url = require('url')

/*
//create a server object
http.createServer(function (req, res) {
	//The status code, 200 means that all is OK
	res.writeHead(200, {'Content-Type': 'text/html'})
	//write a response to the client
	res.write("The date and time are currently: " +
	dt.myDateTime())
	//End the response
	res.end()
}).listen(8080) //server object listens on port 
*/

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'})
	var q = url.parse(req.url, true).query
	var txt = q.year + " " + q.month
	res.end(txt)
}).listen(8080)

