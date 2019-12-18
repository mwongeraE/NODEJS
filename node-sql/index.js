//from http://www.mysqltutorial.org/mysql-nodejs/connect/

let mysql = require('mysql')


//create a connection to the MYSQL database
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9090Ty@1975',
    database: 'todoapp'
})

//call the connect() method to connect to the mysql server
connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message)
    }
    console.log('Connected to the MYSQL server')

    
})

//Closing database connection
/*
the end() method ensures that all remaining queries are always executed before the database
*/
connection.end(function(err) {
    if (err) {
        return console.log('error: ' + err.message)
    }

    console.log('Close thr database connection')
})

/*
To force the connection to close immediately
connection.destroy()
*/

//Pooling connections

/*
Create a pool with 5 connection
*/
var pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todoapp'
})

//To get a connection from the pool
pool.getConnection(function(err, connection) {
    //Execute query
    //....

    //To return a connection to the pool after ur done with it
    connection.release()
})

//To close all the connections in the pool. use the end()
pool.end(function(err) {
    if (err) {
        return console.log(err.message)
    }
})