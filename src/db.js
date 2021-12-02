const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MSQL_DB
});

db.connect((error) => {
  if (error) throw error;
  console.log("Connection to database works!");
});

module.exports = db;




