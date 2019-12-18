//the url module splits up a web address into readable parts
var url = require('url')
var adr = 'http://localhost:8080/default.htm?year=2017&month=february'
var q = url.parse(adr, true)

console.log(q.host)
console.log(q.hostname)
console.log(q.search)

var qdata = q.query

console.log(qdata.month)


//With 2 html files
var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer(function (req, res) {
    var q = url.parse(req.url, true)
    var filename = "." + q.pathname
    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'})
            return res.send("404 not found")
        }
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data)
        return res.end()
    })
}).listen(8080)