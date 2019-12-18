var express = require('express')
var cors = require('cors')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var app = express()

var schemaName = new Schema({
        request: String,
        time: Number
}, {
    collection: 'collectionNAame'
})

var Model = mongoose.model('Model', schemaName)
mongoose.connect(`mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@ds245132.mlab.com:45132/mongojr`, { useNewUrlParser: true })

app.get('/save/:query', cors(), function(req, res) {
    var query = req.params.query

    var savedata = new Model({
            'request': query,
            'time': Math.floor(Date.now() / 1000) // Time of save the data
        //in the unix timestamp format
        
    }).save(function(err, result) {
            if (err) throw err

            if (result) {
                     res.json(result)
        }
    })
})

app.get('/find/:query', cors(), function(req, res) {
    var query = req.params.query

    Model.find({
            'request': query
    }, function(err, result) {
        if (err) throw err
        if (result) {
                res.json(result)
        } else {
            res.send(JSON.stringify ({
                error: 'Error'
            }))
        }
    })
})

var port = process.env.PORT || 9080

app.listen(port, function() {
    console.log('Node.js listening on port ' + port)
})