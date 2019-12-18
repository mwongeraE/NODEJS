/*
Middleware functions can perform the following tasks: 
    Execute any code
    Make changes to the request and response objects
    End the request-response cycle
    Call the next middleware in the stack

Types of express middleware
    Application level middleware app.use
    Router level middleware router.use
    Built-in middleware express.static, express.json, express.urlencoded
    Error handling middleware app.use(err,req,res,next)
    third party middleware bodyparser, cookieparser
*/

//Logging middleware
const express = require('express')

//custom middleware create
const LoggerMiddleware = (req,res,next) => {
    console.log(`Logged ${req.url} ${req.method} --${new Date()}`)
    next();
}

const app = express()

//application level middleware
app.use(LoggerMiddleware)

//users route
app.get('/users', (req,res) => {
    res.json({
        'status':true
    })
})

//save route
app.post('/save', (req,res) => {
    res.json({
        'status': true
    })
})

app.listen(3002, (req,res) => {
    console.log('server running on port 3002')
})

/*
Router-level middleware works in the same way as application-level middleware, 
Except it's bound to an instance of express.Router()
*/

//const express = require('express')

//const app = express()

const router = express.Router()

router.use((req, res, next) => {
    console.log("Time:", new Date())
    next()
})

router.get("/user/:id", (req,res,next) => {
    console.log('Request URL:', req.originalUrl)
    next()
}, (req,res,next) => {
    console.log('Request Type:', req.method)
    next()
}, (req,res) => {
    res.json({
        status:true,
        id:req.params.id
    })
})

app.use('/', router)

app.listen(3000, (req,res) => {
    console.log('server runnng on 3000')
})