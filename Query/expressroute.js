//Traditional method app.VERB()

/*
We can have multiple request handlers in one route
All of them except the 1st and last will be in the middle of the flow
(order in which they are executed)

They accept a 3rd parameter/function, next, which when called 
switches the execution flow to the next handler
*/

//For example, we have 3 functions that perform authorization, db search and output

app.get('/api/v1/stories/:id',function(request, response, next) {
    //Do authorization
    //If not authorized or there is an error
    //Return next(error)
    //if authorized and no errrors
    return next()
}), function(request, response, next) {
    //extract id and fetch the object from the database
    //Assuming no errors, save story in the request object
    request.story = story
    return next()
}, function(request, response) {
    //Output the result of the database search
    res.send(response.story)
}

//WHat if we have another route/admin. We ca define multiple 
//request handlers, which perform authentication, validation and loading of resources

app.get('/admin',
    function(request, response, next) {
        //Check active session, ie
        //Make sure the request has cookies associated with a valid user
        //Check if the user has admin privileges
        return next()
    }, function(request, response, next) {
        //Load the information required for admin dashboard
        //Such as user list, preferences, sensitive info
        return next()
    }, function(request, response) {
        //Render the info with proper templates
        //Finish response with a proper status
        res.end()
    })


//Use of named functions
var auth = function (request, response, next) {
    //..Authorization and authentication
     return next()
}

var getStory = function (request, response, next) {
    //...Database request for story
    return next()
}

var getUsers = function (request, response, next) {
    //...Database request for users
    return next()
}

var renderPage = function (request, response) {
    if (req.story) res.render('story', story)
    else if (req.users) res.render('users', users)
    else res.end()
}

app.get('/api/v1/stories/:id', auth, getStory, renderPage)
app.get('/admin', auth, getUsers, renderPage)


/*
Another useful technique is to pass callbacks as items of an array
*/
var authAdmin = function (request, response, next) {
    //..
    return next()
}

var getUsers = function (request, response, next) {
    //...
    return next()
}

var renderUsers = function (request, response) {
    // ...
    res.end()
}

var admin = [authAdmin, getUsers, renderUsers]
app.get('/admin', admin)


//app.all()
/*
This method alllows the execution of specified request handlers
on a particular path regardless of what the HTTP method of the 
request is.
*/
app.all('*', userAuth)
app.all('/api/*', apiAuth)


//Router Classs
/*
Its a mini express.js application that has only middleware and routes.
Below is an example:

where options is an object that can have the following properties
caseSensitive
strict
*/

var express = require('express')
var router = express.Router(options)
//..define routes
app.use('/blog', router)

//router.route(path)
/* 
Used to chain HTTP verb methods.
Example
*/
var express = require('express')
var router = express.Router()
//..Importations and configurations
router.param('postId', function(request, response, next) {
    //Find post by ID
    //Save post to request
    request.post = {
        name: 'PHP vs Node Js',
        url: ' http://webapplog.com/php-vs-node-js '
    }

    return next()
})

router
    .route('/posts/:postId')
    .all(function(request, response, next) {
        //This will be called for request with any HTTP method
    })
    .post(function(request, response, next) {

    })
    .get(function(request, response, next) {
        response.json(request.post)
    })
    .put(function(request, response, next) {
        //...Update the post
        response.json(request.post)
    })
    .delete(function(request, response, next) {
        //..Delete the post
        response.json({'message': 'ok'})
    })


/*The Router.route(path) method provides the convenience of 
chaining methods, which is more appealing

Typically, the router.get and router.param methods are abstracted into a separate file
*/

//sample v4
router.param('username', function(request, response, next, username) {
    console.log(
        'Username param was detected: ',
        username
    )
    findUserByUsername(
        username,
        function(error, user) {
            if (error) return next(error)
            request.user = user
            return next()
        }
    )
})

router.get('/users/:username', 
    function(request, response, next) {
        return response.render('user', request.user)
    })

router.get('/admin/:username',
    function(request, response, next) {
        return response.render('admin', request.user)
    })

app.use('/v4', router)