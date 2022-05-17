const inquirer = require("inquirer");
// const { getDepartments, getEmployees, getRoles } = require("./db/query.js");
require("console.table");
const mysql2 = require("mysql2");
require("dotenv").config();

const menu = {
  type: "list",
  name: "search",
  message: "what would you like to do?",
  choices: [
    "View All Employees",
    "Add Employee",
    "Update Employee Role",
    "View All Roles",
    "Add Role",
    "View All Departments",
    "Add Department",
    "Exit",
  ],
};

const connection = mysql2.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "!Seattle12",
    database: "employees_db",
    port: 3306,
  },
  openQuestion()
);
// console.log(connection);

function openQuestion() {
  inquirer.prompt(menu).then((answer) => {
    if (answer.openQuestion === "View All Employees") {
      viewAllEmployees(connection, openQuestion);
    }
  });
}

function viewAllEmployees() {
  connection.query(
    "SELECT e1.id, e1.first_name, e1.last_name, roles.title as role, departments.name AS department, roles.salary, Concat(e2.first_name, ' ', e2.last_name) AS manager FROM employees e1 LEFT JOIN roles ON e1.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees e2 ON e2.id = e1.manager_id",
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      cb();
    }
  );
}
