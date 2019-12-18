app.use(function (req, res, next) {
    if (req.query.id) {
        //process the id, then call next() when done
    } else if (req.query.author) {
        //same approach as with id
    } else if (req.query.id && req.query.ref) {
        //process when id and ref present
    } else {
        next()
    }
})

app.get('/about', function (req, res, next) {
    //this code is executed after the query string middleware
})