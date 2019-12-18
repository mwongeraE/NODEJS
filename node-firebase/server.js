var express = require('express')
var mongoose = require('mongoose')
var dbUrl = 'mongodb://nero:10mandem@ds135255.mlab.com:35255/nodenew'
var bodyParser = require('body-parser')
var http = require('http').Server(app)
var io = require('socket.io')(http)
var app = express()

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var Message = mongoose.model('Message', {name : String, message : String})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

//Will get all the messages from database
app.get('/messsages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})

app.get('/messages/:user', (req, res) => {
    var user = req.params.user
    Message.find({name: user}, (err, messages) => {
        res.send(messages)
    })
})

//will post new messages created by the user to the database
app.post('/messages', async(req, res) => {
    try{
        var message = new Message(req.body)

        var savedMessage = await message.save()
        console.log('saved')

        var censored = await Message.findOne({message:'badword'})
        if (censored)
        await Message.remove({_id: censored.id})
        else
        io.emit('message', req.body)
        res.sendStatus(200)
    }
    catch (error) {
        res.sendStatus(500)
        return console.log('error', error)
    }
    finally {
        console.log('Message posted')
    }
})

io.on('connection', function(socket) {
    console.log('A user is connected')
})

mongoose.connect(dbUrl,{ useNewUrlParser: true } , (err) => {
    console.log('mongodb connected', err)
})

var server = app.listen(3000, () => {
    console.log('Server is running on port', server.address().port)
})
