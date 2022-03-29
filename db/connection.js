// db variable to create connection to database
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Finntroll1",
  database: "employees_db",
});
