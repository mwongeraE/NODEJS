//program  selects only completed todo
let mysql = require('mysql')
let config = require('./config.js')

let connection = mysql.createConnection(config)

let sql = `SELECT * FROM todos WHERE completed=?`

//prevent sql injection
let sql = `SELECT * FROM todos WHERE id = ` + mysql.escape(id)

connection.query(sql,[true], (error, results, fields) => {
    if (error) {
        return console.error(error.message)
    }
    console.log(results)
})

connection.end()