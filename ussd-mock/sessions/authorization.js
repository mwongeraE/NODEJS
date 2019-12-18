app.all('/api/*', auth);
app.get('/api/users', users.list)
app.post('/api/users', users.create)

//or
app.get('api/users', auth, users)
app.post('/api/user', auth, users.create)

var auth = function(req, res, next) {
    //authorize user
    //if auth failed, then exit is next(new Error('Not authorized))
    //or res.send(401)
    return next()
}

//Token-Based Authentication
var auth = function(req, res, next) {
    if (req.query.token && token === SECRET_TOKEN) {
        //Client is fine, proceed to next route
        return next()
    } else {
        return next(new Error('Not Authorized'))
        //or res.send(401)
    }
}

app.post('/login', function(req, res, next) {
    //this function checks for credentials
    //passed in the request's payload
    if (checkForCredentials(req)) {
        req.session.auth = true
        res.redirect('/dashboard') //Private resource
    } else {
        res.send(401) //Not authorized
    }
})

//Authorization
var authorize = function(req, res, next) {
    if (req.session && req.session.admin) {
        return next()
    } else {
        return res.send(401)
    }
}

//Now you can add this middleware to certain protected end points
app.get('/admin', authorize, routes.article.list)
app.get('/post', authorize, routes.article.post)
app.post('/post', authorize, routes.article.postArticle)

//We add the authorizr middleware to api routes as well
app.all('/api', authorize)
app.get('/api/articles', routes.article.list)
app.post('/api/articles', routes.article.add)
app.put('/api/articles/:id', routes.article.edit)
app.del('/api/articles/:id', routes.article.del)