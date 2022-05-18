const inquirer = require("inquirer");
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
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
  },
  openQuestion()
);
// console.log(connection);

function openQuestion() {
  inquirer.prompt(menu).then((answer) => {
    console.log(answer);
    if (answer.search === "View All Employees") {
      // console.log("Hello");
      viewAllEmployees();
    } else if (answer.search === "View All Roles") {
      viewAllRoles();
    } else if (answer.search === "View All Departments") {
      viewAllDepartments();
    } else if (answer.search === "Add Employee") {
      addEmployee();
    } else if (answer.search === "Add Role") {
      addRole();
    } else if (answer.search === "Add Department") {
      addDepartment();
    } else if (answer.search === "Update Employee Role") {
      updateEmployee();
    } else if (answer.search === "Exit") {
      process.exit();
    }
  });
}

function viewAllEmployees() {
  connection.query(
    `SELECT e1.id,
    e1.first_name,
    e1.last_name,
    roles.title as role,
    departments.name AS department,
    roles.salary, Concat(e2.first_name,
    ' ',
    e2.last_name) AS manager FROM employees e1 
    LEFT JOIN roles ON e1.role_id = roles.id 
    LEFT JOIN departments ON roles.department_id = departments.id 
    LEFT JOIN employees e2 ON e2.id = e1.manager_id`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      // console.log(results);
      console.table(results);
      openQuestion();
    }
  );
}

function viewAllRoles() {
  connection.query(
    "SELECT roles.id, roles.title, roles.salary, departments.name as department FROM roles JOIN departments ON roles.department_id = departments.id",
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.table(result);
      openQuestion();
    }
  );
}

function viewAllDepartments() {
  connection.query("SELECT * FROM departments", function (err, result) {
    if (err) {
      console.log(err);
    }
    console.table(result);
    openQuestion();
  });
}
// Adding Department
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "addDepartment",
      message: "what is the name of the department?",
    })
    .then(function (answer) {
      connection.query(
        "INSERT INTO departments (name) VALUES (?)",
        [answer.addDepartment],
        function (err) {
          if (err) {
            console.log(err);
          }
          console.log("New department added!");
          openQuestion();
        }
      );
    });
}
//Adding Role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "what is the name of the Role?",
      },
      {
        type: "input",
        name: "salary",
        message: "what is the salary of the Role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "what department does this role belong too?",
        choices: [
          { name: "Sales", value: 1 },
          { name: "Engineering", value: 2 },
          { name: "Finance", value: 3 },
          { name: "Legal", value: 4 },
        ],
      },
    ])
    .then(function (answer) {
      console.log(answer);
      connection.query(
        `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
        [answer.title, answer.salary, answer.department_id],
        function (err) {
          if (err) {
            console.log(err);
          }
          console.log("New Role added!");
          openQuestion();
        }
      );
    });
}
//Adding Employees
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "what is the Employee's frist name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "what is the Employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
        choices: [
          { name: "SalesLead", value: 1 },
          { name: "Salesperson", value: 2 },
          { name: "Lead Engineer", value: 3 },
          { name: "Software Engineer", value: 4 },
          { name: "Legal TeamLead", value: 5 },
          { name: "Lawyer", value: 6 },
          { name: "Account Manager", value: 7 },
          { name: "Accountant", value: 8 },
        ],
      },
      {
        type: "list",
        name: "manager_id",
        message: "what department does this role belong too?",
        choices: [
          { name: "Sales Lead", value: 1 },
          { name: "Lead Engineer", value: 2 },
          { name: "Legal Team Lead", value: 3 },
          { name: "Account Manager", value: 4 },
        ],
      },
    ])
    .then(function (answer) {
      console.log(answer);
      connection.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          answer.first_name,
          answer.last_name,
          answer.role_id,
          answer.manager_id,
        ],
        function (err) {
          if (err) {
            console.log(err);
          }
          console.log("New employee added!");
          openQuestion();
        }
      );
    });
}

function updateEmployee() {
  selectEmployeeNames = () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT first_name FROM employees",
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          console.log(elements);
          return resolve(elements);
        }
      );
    });
  };

  selectRoleTitles = () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT title FROM roles", (error, titles) => {
        if (error) {
          return reject(error);
        }
        console.log(titles);
        return resolve(titles);
      });
    });
  };
  async function followQueries() {
    const result1 = await selectEmployeeNames();
    const result2 = await selectRoleTitles();

    const promises = [result1, result2];

    try {
      const results = await Promise.all(promises).then((data) => {
        //console.log(promises);
        nameArr = [];
        result1.forEach((object) => {
          nameArr.push(object.first_name);
        });
        //console.log(nameArr)

        titleArr = [];
        result2.forEach((object) => {
          titleArr.push(object.title);
        });
        //console.log(titleArr)

        inquirer
          .prompt([
            {
              type: "list",
              message: "Whose role do you want to update? ",
              name: "person",
              choices: nameArr,
            },
            {
              type: "list",
              message: "Which role would you like to assign? ",
              name: "newRole",
              choices: titleArr,
            },
          ])
          .then((data) => {
            const sql = "SELECT id from roles WHERE title = ?";
            const roleName = data.newRole;
            connection.query(sql, roleName, (err, result) => {
              if (err) {
                console.log(err);
              }
              //console.log(result);
              const person = data.person;
              const newRole = result[0].id;
              const sql = `UPDATE employees SET role_id = ? WHERE first_name = ?`;
              connection.query(sql, [newRole, person], (err, results) => {
                if (err) {
                  console.log(err);
                }
                //console.log(results);
                openQuestion();
              });
            });
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  //console.log("before await");
  followQueries();
  //console.log("after await");
}
