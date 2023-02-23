const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "sql9.freesqldatabase.com",
    user: "sql9600508",
    password: 'dYSvpAHW7u',
    database: 'sql9600508'
})

connection.connect((err)=>console.log(err || 'Database Connected'))

module.exports = connection.promise()