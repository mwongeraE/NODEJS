var mongoose = require('mongoose')

var tenantSchema = new mongoose.Schema({
    phoneNumber: {type: String, required: true, unique: true},
    password: { type:String, required: true },
    balance: {type: String, required: true},
    issued_at: {type: Date},
    updated_at : {type: Date}

})

//authenticate input against database
tenantSchema.statics.authenticate = function (phoneNumber, password, callback) {
    Tenant.findOne({ phone_number: phoneNumber})
    .exec(function (err, user) {
        if (err) {
            return callback(err)
        } else if (!user) {
            var err = new Error('Tenant not found')
            err.status = 401
            return callback(err)
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result === true) {
                return callback(null, user)
            } else {
                return callback()
            }
        })
    })
}

//Hashing a password before ssaving it to the database
tenantSchema.pre('save', function (next) {
    var user = this
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err)
        }
        user.password = hash
        next()
    })
})

var Tenant = mongoose.model('Tenant', tenantSchema)

module.exports = Tenant