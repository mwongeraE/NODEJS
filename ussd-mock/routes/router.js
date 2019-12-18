var express = require('express')
var router = express.Router()
var db = require('../models')

//Get route for reading data
router.get('/', function(req, res, next) {
    //Some methods and functions
})

//Post route for updating data
router.post('/', function (req, res, next) {
    //confirm that the user typed same password twice
    if (req.body.password != req.body.passwordConf) {
        var err = new Error('Passwords do not match')
        err.status = 400
        res.send("passwords dont match")
        return next(err)
    } 

    
})