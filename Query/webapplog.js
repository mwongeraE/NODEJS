var user = {
    'azat': {
        email: 'hi@azt.co',
        website: 'http://azat.co',
        blog: 'http://webapplog.com'
    }
}

//Abstraction- Refactor the code so that it can be reused 
//in other places and/or organized better. This improves maintainability
//and readabilty of the code

var findUserByUsername = function (username, callback) {
    //Perform database query that calls callback when its done
    //This is our fake database
    if (!users[username])
        return callback(new Error(
            'No user matching'
            + username
        )
        )
        return callback(null, users[username])

}

app.get('/v1/users/:username', function(request, response, next) {
    var username = request.params.username
    findUserByUsername(username, function(error, user) {
        if (error) return next(error)
        return response.render('user', user)
    })
})

app.get('/v1/admin/:username', function(request, response, next) {
    var username = request.params.username
    findUserByUsername(username, function(error, user) {
        if (error) return (error)
        return response.render('admin', user)
    })
})

/*
The middleware checks for the presence of the parameter(request.params.username)
and then, if its present, proceeds to fetch the information
*/
var findUserByUsernameMiddleware = function(request, response, next) {
    if (request.params.username) {
        console.log('Username param was detected: ', request.params.username)
        findUserByUsername(request.params.username, function(error, user) {
            if (error) return next(error)
            request.user = user
            return next()
        }) 
    } else {
        return next()
    }
}

//The v2 routes that use the custom middleware
app.get('/v2/users/:username',
    findUserByUsernameMiddleware,
    function(request, response, next){
        return response.render('user', request.user)
    })

app.get('/v2/admin/:username',
    findUserByUsernameMiddleware,
    function(request, response, next){
        return response.render('admin', request.user)
    })


/*
app.param()
*/
app.param('username', function (request, response, next, username) {
    //...Perform database query and
    //...Store the user object from the database in the req object
    req.user = user
    return next()
})

app.get('/users/:username', function(request, response, next) {
    //...Do something with req.user
    return res.render(req.user)
})

app.get('/admin/:username', function(request, response, next) {
    //..Same thing, req.user is available
    return res.render(user)
})

/*
Another example of how we can plug middleware into our app
*/

app.param('id', function(request, response, next, id) {
    //Do something with id
    //Store id or other info in req object
    //call next when done
    next()
})

app.get('/api/v1/stories/:id', function(request, response) {
    //Param middleware will be executed before and
    //We expect req objects to already have needed info
    //Output something
    res.send(data)
})

/*
An example of plugging param middleware into an app that has a Mongoskin/Monk-like
database connection in req.db
*/
app.param('id', function(request, response, next, id) {
    req.db.get('stories').findOne({_id: id}, function (error, story) {
        if (error) return next(error)
        if (!story) return next(new Error('Nothing is found'))
        req.story = story
        next()
    })
})

app.get('/api/v1/stories/:id', function(request, response) {
    res.send(req.story)
})

/*
We can use multiple request handlers, but the concept remains the same
we can expect to have a rea.story object or an error thrown 
prior to the execution of this code, so we abstract the common
code/logic of getting parameters and their respective objects
*/
//Example
app.get('/api/v1/stories/:id', function(request, response, next) {
    //do authorization
    },
    //we have an object in req.story so no work is needed here
    function(request, response) {
        //Output the result of the database search
        res.send(story)
})

/*The param() function is especially cool, because we can combine 
different variables in thr routes
*/

app.param('storyId', function(request, response, next, storyId) {
    //fetch the story by its ID (storyId) from a database
    //Save the found story object into request object
    request.story = story
})

app.param('elementId', function(request, response, next, elementId) {
    //Fetch the element by its ID (elementId) from a database
    //Narrow down the search when request.story is provided
    //Save the found element object into request object
    request.element = element
})

app.get('/api/v1/stories/:storyId/elements/:elementId', function(request, response) {
    //Now we automatically get the story and element in the request object
    res.send({ story: request.story, element: request.element })
})

app.post('/api/v1/stories/:storyId/elements', function(request, response) {
    //Now we automatically get the story in the request object
    //We use story ID to create a new element for that story
    res.send({ story: request.story, element: newElement })
})


//V3 of example
app.param('v3Username', function(request, response, next, username) {
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

app.get('/v3/admin/:v3Username',
    function(request, response, next) {
        return response.render('admin',)
    })

