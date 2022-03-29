// db variable to create connection to database
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db",
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Now connected as ID" + connection.threadId);
  });
  
  module.exports = connection;


