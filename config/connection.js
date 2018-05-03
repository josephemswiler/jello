const mysql = require('mysql')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'trello_db'
})

connection.connect(function(err) {
  if (err) {
    console.error(`Error connecting: ${err.stack}`)
    return
  }
  console.log(`Connected as id: ${connection.threadId}`)
})

module.exports = connection