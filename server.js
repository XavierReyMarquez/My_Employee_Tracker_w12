// const express = require("express");
const mysql = require("mysql2");
const cTable = require("console.table");

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const connection = require("./db/database");
const { getDepartments, getEmployees, getRoles } = require("./db/query.js");
// const { listen } = require("express/lib/application");

function startingQuestion() {
  inquirer
    .prompt({
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
    })
    .then(function (answer) {
      switch (answer.search) {
        case "View all departments":
          viewAllDepartments();
          break;

        case "View all roles":
          viewAllRoles();
          break;

        case "View all employees":
          viewAllEmployees();
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Update an Employee Role":
          updateEmployeeRole();
          break;

        case "Exit":
          console.log("See Ya!");
          connection.end();
          break;
      }
    });
}

function viewAllEmployees() {
  const query = connection.query(
    "SELECT e1.id, e1.first_name, e1.last_name, roles.title as role, departments.name AS department, roles.salary, Concat(e2.first_name, ' ', e2.last_name) AS manager FROM employees e1 LEFT JOIN roles ON e1.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees e2 ON e2.id = e1.manager_id",
    function (err, res) {
      if (err) throw err;
      console.log("\n All Employees \n");
      console.table(res);
      questionsOpening();
    }
  );
}
