//Route handlers
/*
A single callback function can handle a route
*/

app.get('/example/a', function (req,res) {
    res.send('Hello From A')
})


/*
More than one callback function
*/

app.get ('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function (req, res) {
    res.send('Hello from B')
})

/*
An array of callback functions can handle a route
*/

var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}

var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}

var cb2 = function (req, res) {
    res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])

/*
A combination of independent functions and arrays of functions can handle a route
*/

var cb11 = function (req, res, next) {
    console.log('cb11')
    next()
}

var cb12 = function(req,res,next) {
    console.log('CB1')
    next()
}

app.get('/example/d', [cb11, cb12], function (req,res,next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function (req, res) {
    res.send('Hello from D!')
})

//chaining route handlers
app.route('/book')
    .get(function (req, res) {
        res.send('Get a random book')
    })
    .post(function (req, res) {
        res.send('Add a book')
    })
    .put(function (req, res) {
        res.send('Update the book')
    })


