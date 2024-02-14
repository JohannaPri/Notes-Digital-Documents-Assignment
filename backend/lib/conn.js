const mysql = require('mysql2');

connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "ProjectNotes",
    password: "Notes123",
    database: "ProjectNotes"
})

module.exports = connection; 