// Imports inquirer npm package
const inquirer = require("inquirer");
// Imports mysql package
const mysql = require("mysql2");
// Imports connection file.
const connection = require("./db/connection");
const queries = require("./db/index.js");


// Starts the inquireer packagage and allows users to answer prompts to interact with tables.
function startPrompt() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "what would you like to do?",
          name: "choice",
          choices: [
            "View employees",
            "View roles",
            "View departments",
            "Update employee",
            "Add employee",
            "Add role",
            "Add department",
          ],
        },
      ])
      .then((value) => {
        switch (value.choice) {
          case "View employees":
            viewAllEmployees();
            break;
  
          case "View roles":
            viewAllRoles();
            break;
  
          case "View departments":
            viewAllDepartments();
            break;
  
          case "Update employee":
            updateEmployee();
            break;
  
          case "Add employee":
            addEmployee();
            break;
  
          case "Add role":
            addRole();
            break;
  
          case "Add department":
            addDepartment();
            break;
        }
      });
  }

//    Function that allows the user to view all employees in the DB. 
// Joins the information from the Employees, Managers, Roles, and Departments table into one table.*/
function viewAllEmployees() {
    connection.query(queries.allEmp, (err, res) => {
      if (err) throw err;
      console.table(res);
      startPrompt();
    });
  }
  
  // Function that allows the user to view all departments by selecting all data from the managers table and displaying it in the terminal.
  function viewAllDepartments() {
    connection.query(queries.allDept, (err, res) => {
      if (err) throw err;
      console.table(res);
      startPrompt();
    });
  }
  // Function for showing the roles and departments. Selects the Rold ID, Title, Salary, and Department ID from the role table and joins the information together with the corresponding department.
  function viewAllRoles() {
    connection.query(queries.allRoles, (err, table) => {
      if (err) {
        console.log(err);
      }
      console.table(table);
      startPrompt();
    });
  }


//   Function to add role.
// Select title and salary from the role table, and prompts the user to select a new role and salary.
// inserts the new title aand salary into the role table.

function addRole() {
    connection.query(queries.addRole, function (err, res) {
        inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the new role?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the new role?',
            },
        ])
        .then (function(res) {
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: res.title,
                    salary: res.salary,
                },
                function(err) {
                    if (err) throw err;
                    console.table(res);
                    startPrompt;
                }
            );
        });
    });
}

//  Function to add a department.
// Prompts user to name the new department.
// Inserts the new department into the Departments table in the name category.
function addDepartment() {
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "Which department would you like to add?",
        },
      ])
      .then((res) => {
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: res.name,
          },
          function (err) {
            if (err) throw err;
            console.table(res);
            startPrompt();
          }
        );
      });
  }


  // Role queries. Creates an empty array for Roles. Selects all from Role table and loops through to return the list of roles and add any new roles.
const roleArray = [];
function selectRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }
  });
  return roleArray;
}