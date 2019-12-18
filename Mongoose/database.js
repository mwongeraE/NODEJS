let mongoose = require('mongoose')
const dotenv = require('dotenv')

const user = process.env.USERNAME
const pwd = process.env.PASSWORD

const server = `mongodb:// ${user} : ${pwd}@ds245132.mlab.com:45132/mongojr`
const database = 'mongojr'

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true })
    .then (() => {
      console.log('Database connection successful')
    })
    .catch(err => {
      console.error('Database connection error')
    })
  }
}

module.exports = new Database()
