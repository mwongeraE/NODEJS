let mysql = require('mysql')
let config = require('./config.js')

let connection = mysql.createConnection(config)

let id = process.argv[2]
let sql = `SELECT * FROM todos WHERE id=` + id;

connection.query(sql, (error, results, fields) => {
    if (error) {
        return console.error(error.message)
    }
    console.log(results)
})

connection.end()