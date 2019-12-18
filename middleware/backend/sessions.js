/*
https://mianlabs.com/2018/05/09/understanding-sessions-and-local-authentication-in-express-with-passport-and-mongodb/

*/

const session = require('express-session');
const User = require('./models/user')

 //express-session must be used before passport
 //order of this matters
 app.use(session({
     secret: 'catsanddogs',
     resave: false,
     saveUninitialized: false
 }))
 app.use(express.urlencoded({ extened: true }))//express body-parser
 app.use(passport.initialize())
 app.use(passport.session())

 const passport = require('passport'),
    LocalStrategy = require('passport-local').strategy


passport.use(new LocalStrategy (
    function(username, password, done) {
        username.findOne({ username: username}, function (err, user) {
            if (err) { return done (err) ;}
            if (!user) {
                return done(null, false, { message: 'Incorrect username'})
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'incorrect password'})
            }  
            return done(null, user)
        })
    }
))

//use the passport middleware for authentication
app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}))

//passport-local-mongoose takes care of salting and hashing user passwords, serializing and deserializing your user model
//(for session storage) and authenticating the username and password credentials with their stored counterparts in the mongo db
const passportLocalMongoose = require('passport-local-mongoose')

//Use 'createStrategy' INSTEAD OF 'authenticate'
//This uses and configures passport-local behind the scens
passport.use(User.createStrategy())

//use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.post('/register', (request, response) => {
    //Creates and saves a new user with a salt and hashed password
    User.register(new User ({username: request.body.username}), request.body.password, function(err, user) {
        if (err) {
            console.log(err)
            return response.render('register')
        } else {
            passport.authenticate('local')(request, response, function(err, user) {
                response.redirect('/dashboard')
            })
        }
    })
})

//verify the user is logged in
function isLoggedIn(request, response, next) {
    //passport adds this to the request object
    if (request.isAuthenticated()) {
        return next()
    }
    response.redirect('/login')
}

//Here it is in action
app.get('/dashboard', isLoggedIn, (request, response) => {
    //dashboard logic
})

//logging out
//passport includes a logout function on request that can be called from a route handler

app.get('/logout', (request, response) => {
    request.logout()
    response.redirect('/')
})