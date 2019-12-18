//File System
//Create a file that reads the HTML file and return the content

var http = require('http')
var fs = require('fs')
http.createServer(function (req, res) {
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data)
        res.end()
    })
}).listen(8090)

//Create file. If the file does not exist it will be created
var fs = require('fs')

fs.appendFile('mynewfile.txt', 'Hello Content'),
function (err) {
    if (err) throw err
    console.log('saved')
}

//Replaces the specified file and content if it exists. If the file does not exist, 
//a new file, containing content, will be created
var fs = require('fs')

fs.writeFile('mynewfile2', 'hello content new', 
function (err) {
    if (err) throw err
    console.log('saved')
})

//Update a file
var fs = require('fs')

fs.appendFile('mynewfile.txt', 'this is my text', 
function (err) {
    if (err) throw err
    console.log('Updated')
})

//Delete files
//delete mynewfile
var fs = require('fs')

fs.unlink('mynewtextfile.txt', 
function (err) {
    if(err) throw err
    console.log('File deleted')
})

//Rename a file
var fs = require('fs')

fs.rename('mynewtextfile.txt', 'myrenamedfile.txt', 
function (err){
if (err) throw err
console.log('File renamed')
})