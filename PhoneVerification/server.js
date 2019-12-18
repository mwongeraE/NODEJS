//Import required packages
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator/check')

//port config
const port = 4110

app.use(bodyParser.urlencoded({ extended: true }))

//Custom error parameters
const signupFailures = ({location, msg, param, value, nestedErrors}) => {
    return {
        type: "Error",
        name: "Signup Failure",
        location: location,
        message: msg,
        param: param,
        value: value,
        nestedErrors: nestedErrors
    }
}

let myValidators =[
check('username')
.isLength({ min:1 }).withMessage('Login is a required field')
.isAlphanumeric().withMessage('Login must be alphanumeric'),

check('password')
.isLength({ min:8 }).withMessage('Password must be atleast 8 characters in length')
.matches('[0-9]').withMessage('Password must contain at least 1 number')
.matches('[a-z]').withMessage('Password must contain atleast 1 lowercase letter')
.matches('[A-Z]').withMessage('password must contain atleast 1 uppercase letters')
.custom((value, {req, loc, path}) => {
    if (value !== req.body.confirmPassword) {
        return false
    } else {
        return value
    }
}).withMessage("Passwords don't match"),
]

//Routes. Where the app can accept data
app.post('/validateMe', myValidators, function(req, res) {

    console.log(req.body)
    var errors = validationResult(req).formatWith(signupFailures)

    if (!errors.isEmpty()) {
        res.status(400).json(errors.array())
    } else {
    res.sendStatus(200)
    }
})

//Launch app
app.listen(port, function(req, res) {
    console.log('Server is running on port: ', port)
})

