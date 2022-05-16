// connect to data base
const mysql = require("mysql2");
require("dotenv").config();
const Sequelize = require("sequelize");

const connection = new Sequelize(
  // Database name
  process.env.DB_NAME,
  // User
  process.env.DB_USER,
  // Password
  process.env.DB_PASSWORD,
  {
    // Database location
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = connection;
