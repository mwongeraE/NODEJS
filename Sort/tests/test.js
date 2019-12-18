//Test pyramid
/*you should write unit tests, integration tests and end-to-end tests

You should write the test for the exposed methods, not for the internal 
workings of the given module

The Anatomy of a Unit Test
    -Test setup
    -calling the tested method
    -asserting

Each unit test should test one concern only

Modules used for node Unit testing
    -test runner: mocha / tape
    -assertion lib: chai / assert module
    -test spies, stubs and mocks: sinon(for test setup)

        
*/

//Spies
/*
-you can use spies to get information on function calls, like how many times 
they were called, or what arguments were passed to them
*/
it ('calls subscribers on publish', function () {
    var callback = sinon.spy()
    PubSub.subscribe('message', callback)

    PubSub.publishSync('message')

    assertTrue(callback.called)
})

//Stubs
/*
Are like spies, but they replace the target function. You can use stubs to
control a method's behaviour to force a code path(like throwing errors) or
to  prevent calls to external resources
*/

it ('calls all subscribers, even if there are exceptions', 
function () {
    var message ='an example message'
    var error = 'an example error message'
    var stub = sinon.stub().throws
    var spy1 = sinon.spy()
    var spy2 = sinon.spy()

    
})
