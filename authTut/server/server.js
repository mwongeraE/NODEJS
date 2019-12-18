const express = require('express')
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const axios = require('axios')
const bcrypt = require('bcrypt-nodejs')

//configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email'},
  (email, password, done) => {
    console.log('Inside local strategy callback')
    // Here is where you make a call to the database
    // to find the user based on their username or email address
    // for now, we'll just pretend we found that it was users[0]

    axios.get(`http://localhost:5002/users?email=${email}`)
    .then(res => {
      const user = res.data[0]
      if (!user) {
        return done(null, false, {message: 'Invalid credentials. \n'})
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, {message: 'Invalid credentials. \n'})
      }
      return done(null, user)
    })

    .catch(error => done(error))
  }
))

//tell passport how to serialize the user
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback')
  console.log(`The User id passport saved in the session file store is: ${id}`)
  axios.get(`http://localhost:5002/users/${id}`)
  .then(res => done(null, res.data))
  .catch(error => done(error, false))
})

//create the server
const app = express()

//Add and configure middleware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(`Request object sessionID from client: ${req.sessionID}`)
    return uuid()
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

//Create the homepage route at '/'
app.get('/', (req, res) => {
  console.log('Inside the homepage callback function')
  //console.log(req.sessionID)
  //const uniqueId = uuid()
  res.send(`you just hit the home pag3. Unique ID is: ${uniqueId} \n`)
})

//create the login get and post routes
app.get('/login', (req,res) => {
  console.log('Inside GET /login callback function')
  //console.log(req.sessionID)
  res.send("You got to the login page!\n")
})

app.post('/login',(req, res, next) => {
  console.log('Inside POST / login callback function')
  passport.authenticate('local', (err, user, info) => {
    if(info) {return res.send(info.message)}
    if(err) {return next(err)}
    if(!user) { return res.redirect('/login')}

    req.login(user, (err) => {
      if (err) { return next(err)}
      return res.redirect('authrequired')
    })
  })(req, res, next)
})

app.get('/authrequired', (req, res) => {
  console.log('Inside GET/authrequired callback')
  console.log(`User Authenticated? ${req.isAuthenticated()}`)
  if(req.isAuthenticated()) {
    res.send('You hit the authentication endpoint\n')
  } else {
    res.redirect('/')
  }
})

//tell the server what port to listen on
app.listen(5002, () => {
  console.log('Listening on localhost:5002')

})
