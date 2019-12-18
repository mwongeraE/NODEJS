const express = require('express')
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const app = express()

//new instance from express-session which will store our sessions
app.use(session({
    store:new RedisStore({
        url: config.redisStore.url
    }),
    secret: config.redisStore.secret,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.usee(passport.session())