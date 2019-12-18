let mysql = require('mysql')
let config = require('./config.js')
let connection = mysql.createConnection(config)

/*
 To pass data to an SQL statement, you use the question marks as the placeholders
*/
let stmt = `INSERT INTO todos(title, completed)
            values(?, ?)`
let todo = ['Insert a new row with placeholders', false]

//execute the insert statement
connection.query(stmt, todo, (err, results, fields) => {
    if (err) {
        return console.error(err.message)
    }
    //get inserted id
    console.log('Todo Id: ' + results.insertId)
})
    
connection.end()