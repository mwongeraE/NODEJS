/* EXPRESS SETUP */
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')

const app = express()

/* MONGOOSE SETUP */
mongoose.connect('mongodb://localhost/MyDatabase')

const Schema = mongoose.Schema

const UserDetail = new Schema({
  username: String,
  password: String
})

const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo')
//The 1st the name of the collection in the database, The 2nd is the refence to our Schema
//The 3rd is the name of collection inside mongoose

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.sendFile('auth.html', {
  root : __dirname }))

const port = process.env.PORT || 7000

app.listen(port, () => console.log('App listening on port ' + port))

/* PASSPORT SETUP */
app.use(passport.initialize())
app.use(passport.session())

app.get('/success', (req, res) => res.send("Welcome" + req.query.username + "!!"))
app.get('/error', (req, res) => res.send("Error logging in"))

passport.serializeUser(function(user, cb) {
  cb(null, user.id)
})

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user)
  })
})

/* PASSSPORT LOCAL AUTHENTICATION */
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
  function(username, password, done) {
    UserDetails.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err)
      }

      if (!user) {
        return done(null, false)
      }

      if (user.password != password) {
        return done (null, false)
      }

      return done(null, user)
    })
  }
))

app.post('/',
  passport.authenticate('local', {failureRedirect: '/error'}),
  function(req, res) {
    res.redirect('/success?username= '+req.user.username)
  }
)
