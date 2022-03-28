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