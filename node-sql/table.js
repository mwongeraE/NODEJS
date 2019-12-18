let mysql = require('mysql')
let config = require('./config')
let connection = mysql.createConnection(config)

//connect to the mysql server
connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message) 
    }


    let createTodos = `create table if not exists todos(
        id int primary key auto_increment,
        title varchar(255)not null,
        completed tinyint(1) not null default 0
    )`;

    //query method accepts an SQL statement and a callback. The callback function takes 3 arguments
    /*
    error: stores the detailed error if it occurs
    results: contains the results of the query
    fields: contains results fields info if any
    */
    connection.query(createTodos, function(err, results, fields) {
        if (err) {
            console.log(err.message)
        }
    })

    connection.end(function(err) {
        if(err) {
            return console.log(err.message)
        }
     })
})