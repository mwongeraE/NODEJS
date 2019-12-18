const mongoose = require('mongoose')

const initDB = () => {
    mongoose.connect(
        'mongodb://evans:world123@ds117846.mlab.com:17846/graphqll',
        { useNewUrlParser: true }
    )

    mongoose.connection.once('open', () => {
        console.log('connected to database')
    })
}

module.exports = initDB