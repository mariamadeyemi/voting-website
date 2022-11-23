const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'voting_website'
})

connection.connect((err)=>console.log(err || 'Database Connected'))

module.exports = connection.promise()