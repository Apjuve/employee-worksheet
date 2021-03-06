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

// Manager queries. Creates an empty array for Managers. Selects all from Managers table and loops through to return the list of roles and add any new Managers.
const managersArray = [];
function selectManager() {
    connection.query(
        'SELECT first_name, last_name FROM employee WHERE manager_id IS NULL',
        function(err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                managersArray.push(res[i].first_name);
            }
        }
    );
    return managersArray;
}

// Function for adding an employee.
// This fires the inquirer npm and prompts the user to enter the first name, last name, role, manager. 
// This is added to the DB and the selected role will have a salary attached based on the keys defined in the role table. 


function addEmployee() {
    inquirer
    .prompt([
        {
        name: 'firstname',
        type: 'input',
        message: 'Enter thheir first name',
        },
        {
            name: 'lastname',
            type: 'input',
            message: 'Enter their last name',
        },
        {
            name: 'role',
            type: 'list',
            message: 'What is their role?',
            choices: selectRole(),
        },
        {
            name: 'choice', 
            type: 'rawlist',
            message: 'Whats thie manager name?',
            choices: selectManager(),
        },
    ])
    .then(function(val) {
        let roleId = selectRole().indexOf(val.role) + 1;
        let managerId = selectManager().indexOf(val.choice) + 1;
        connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: val.firstname,
                last_name: val.lastname,
                manager_id: managerId,
                role_id: roleId,
            },
            function(err) {
                if (err) throw err;
                console.table(val);
                startPrompt();
            }
        );
    });
}

// Function for updating the role of an employee.
// Selects the last name and title of the employee to be updated from the employee table.
// User selects the employee they want to update, and then can update that employee's role.
// The updated employee role is inserted into the employee table based on employee's last name.

function updateEmployee() {
    connection.query(queries.updateEmp, function (err,res) {
        if (err) throw err;
        console.log(res);
        inquirer
        .prompt([
            {
                name: 'lastName',
                type: 'rawlist',
                choices: function() {
                    let lastName = [];
                    for (let i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: 'What is the Employee last name? ',
            },
            {
                name: 'role',
                tyoe: 'rawlist',
                message: 'What is the employees new title?',
                choices: selectRole(),
            },
        ])
        .then(function(val) {
            let roleId = selectRole().indexOf(val.role) + 1;
            connection.query(
                'UPDATE employee SET ? WHERE ?',
                [
                    {
                        last_name: val.lastName,
                    },
                    {
                        role_id: roleId,
                    },
                ],
                function(err) {
                    if (err) throw err;
                    console.table(val);
                    startPrompt();
                }
            );
        });
    });
}
startPrompt();