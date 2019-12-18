const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({}) 

UserSchema.plugin(passportLocalMongoose) //responsible for extending the model object

module.exports = mongoose.model('User', UserSchema)