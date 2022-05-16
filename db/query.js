// querys to retrive data
const connection = require("./database");

function getDepartments() {
  return connection.promise().query("SELECT * FROM department");
}

function getRole() {
  return connection.promise().query("SELECT * FROM role");
}

function getEmployee() {
  return connection.promise().query("SELECT * FROM employee");
}

module.exports = {
  getDepartments,
  getRole,
  getEmployee,
};
