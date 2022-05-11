// connect to data base
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhose",

  user: "root",
  password: "!Seattle12",
  database: "",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Successfully Connected to Database!");
});

module.exports = connection;
