const path = require('path')
const express = require('express')

const app = new express()
const router = express.Router()

app.use(express.static('public'))

app.get('/', function (req,res) {
    res.sendFile(path.join(__dirname +'/pages/index.html'))
})

app.get('/about', function  (req,res){
    res.sendFile(path.join(__dirname+'/pages/about.html'))
})

app.get('/contact', function (req, res) {
    res.sendFile(path.join(__dirname+'/pages/contact.html'))
})

app.get('/post', function (req,res) {
    res.sendFile(path.join(__dirname+'/pages/post.html'))
})

app.use('/', router)
app.listen(4000, () => {
    console.log('App listening on port 4000')

})