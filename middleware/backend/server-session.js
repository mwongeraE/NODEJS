const express = require ('express'),
        app = express(),
        session = require('express-session')

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}))

const MongoStore = require('connect-mongo')(session)

app.use(session({
    store: new MongoStore({
        url: process.env.DATABASE_URL
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2 //2 weeks
    }
}))