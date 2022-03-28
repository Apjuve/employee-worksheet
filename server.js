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

  /* Function that allows the user to view all employees in the DB. 
Joins the information from the Employees, Managers, Roles, and Departments table into one table.*/
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