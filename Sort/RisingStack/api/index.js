//The request module
/*
HTTP functions as a request-response protocol in the client-server computing model

SERVICE CODES

1xx - Informational

2xx - Success
    common ones include 200 OK, 201 CREATED, 204 NO CONTENT

3xx - Redirection- shows that the client had to do an additional action to complete the request
    301 Moved permanently, 304 Not modified

4xx - Client Error-Used when  the req sent by client was faulty in some way

5xx - Server error: These codes are sent when the server failed to fulfill a valid request

*/

const request = require('request-promise')

//sending a get request
const options = {
    method: 'GET',
    uri: 'https://risisngstack.com',
    json: true
}

request(options)
    .then(function (response) {
        //Request was successful, use the response object at will
    })
    .catch(function (err) {
        //Something bad happened, handle the error
    })

//Sending a post request
const options = {
    method: 'POST',
    uri: 'https://risisngstack.com/login',
    body: {
        foo: 'bar'
    }, 
    json: true
     //JSON stringifies the body automatically
}

request(options)
    .then(function (response) {
        //Handle the response
    })
    .catch(function (err) {
        //Deal with the error
    })

//To add query string parameters(qs) https://risingstack.com?limit=10&skip=20&sort=asc
const options = {
    method: 'GET',
    uri: 'https//risingstacj.com',
    qs: {
        limit: 10,
        skip: 20,
        sort: 'asc'
    }
}

//define header

const options = {  
       method: 'GET',   
       uri: 'https://risingstack.com' ,  
       headers: {
        'User-Agent': 'Request-Promise',
         'Authorization': 'Basic QWxhZGRpbjpPcGVuU2VzYW1l'
       }}

//Error Handling
