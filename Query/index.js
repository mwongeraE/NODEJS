/*
Your query parameters can be retrieved from the query object on
the request object sent to your route
*/

const express = require('express')
const bodyParser = require('body-parser')
const url = require('url')
const querystring = require('querystring')
//const Article = require('./models').Article

let app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Function to handle the root path
app.get('/', async function(req, res) {

    //Access the provided 'page' and 'limit' query parameters
    let page = req.query.page
    let limit = req.query.limit

    let articles = await Article.findAll().paginate({page: page, limit: limit}).exec()

    //Return the articles to the rendering engine
    res.render('index', {
        articles: articles
    })
})

let server = app.listen(8080, function() {
    console.log('Server is listening on port 8080')
})

//Querying without using express
//const url = require('url')
//const querystring = require('querystring')

let rawUrl = 'http://stackabuse.com/?page=2&limit=3'

let parsedUrl = url.parse(rawUrl)
let parsedQs = querystring.parse(parsedUrl.query)

/*
Extracting route parameters
*/

//Route to return all articles with a given tag
app.get('/tag/:id', async function (req, res) {

    //Retrieve the tag from our URL path
    var id = req.params.id

    let articles = await Article.findAll({ tag: id }).exec()

    res.render('tag', {
        articles: articles
    })
})
