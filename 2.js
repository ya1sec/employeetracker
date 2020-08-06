// TODO: add more cases to if statement in role and manager IDs in addEmployee questions

// NOTE DEPENDENCIES ==================================================
var mysql = require("mysql");
var inquirer = require("inquirer");
const logo = require("asciiart-logo");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "boolean10",
  database: "my_team",
});

// NOTE inquirer prompts/functions ==================
// NOTE SQL/INQUIRER PROMPTS ==================================

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  console.log(
    logo({
      name: "NUZ HQ",
      font: "Speed",
      lineChars: 20,
      padding: 2,
      margin: 3,
      borderColor: "grey",
      logoColor: "bold-white",
      textColor: "red",
    }).render()
  );
  start();
});

function start() {
  inquirer.prompt(menu).then(function (answer) {
    if (answer.menu === "View all employees") {
      viewAll();
    } else if (answer.menu === "Add an employee") {
      addNewEmployee();
    } else if (answer.menu === "Update an employee's info") {
      updateEmployee();
    } else {
      connection.end();
    }
  });
}

function viewAll() {
  console.log("Viewing all employees...\n");
  connection.query(
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.department, managers.manager FROM employees LEFT JOIN roles ON roles.id = employees.role_id LEFT JOIN departments ON departments.id = roles.department_id LEFT JOIN managers ON managers.id = employees.manager_id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}

// TODO: make sure role and manager IDs match names

function addNewEmployee() {
  // query the database to enter results
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;

    // once the employee data is queried
    inquirer.prompt(addEmployee).then(function (answer) {
      connection.query(
        "INSERT INTO employees SET ?",
        [
          {
            first_name: answer.firstname,
            last_name: answer.lastname,
            role_id: answer.role,
            manager_id: answer.manager,
          },
        ],
        function (err, result) {
          if (err) throw err;
        }
      );
      console.log("Employee added successfully.\n");
      start();
    });
  });
}

async function updateEmployee() {
  // query for the category choices
  connection.query("SELECT * FROM employees", async (err, employees) => {
    // get the name, category, starting bid from user
    const { employeeName, newRole, newManager } = await inquirer.prompt([
      {
        type: "list",
        message: "Choose an employees to update:",
        name: "employeeName",
        choices: () => {
          return employees.map(
            (employees) => employees.first_name + " " + employees.last_name
          );
        },
      },
      {
        type: "rawlist",
        message: "What is this employees's new role?",
        name: "newRole",
        // choices: () => {
        //   return employees.map((employees) => employees.role_id);
        // },
        choices: [
          "Senior Engineer",
          "Junior Engineer",
          "Accountant",
          "Sales Lead",
          "Lawyer",
        ],
        filter: (answer) => {
          if (answer === "Senior Engineer") {
            return 1;
          } else if (answer === "Junior Engineer") {
            return 2;
          } else if (answer === "Accountant") {
            return 3;
          } else if (answer === "Sales Lead") {
            return 4;
          } else {
            return 5;
          }
        },
      },
      {
        type: "rawlist",
        message: "Choose the employee's new manager:",
        name: "newManager",
        choices: ["John Domer", "Lexi Zotov", "Alan Clarke", "None"],
        filter: (answer) => {
          if (answer === "John Domer") {
            return 1;
          } else if (answer === "Lexi Zotov") {
            return 2;
          } else if (answer === "Alan Clarke") {
            return 3;
          } else {
            return "null";
          }
        },
      },
    ]);
    // const [chosenWorker] = categories.filter((cat) => cat.name === workerID);
    console.log("Employee updated. \n");
    connection.query(
      "UPDATE employees SET ? WHERE ?",
      [
        {
          role_id: newRole,
          manager_id: newManager,
        },
        {
          first_name: employeeName,
        },
      ],
      function (err, res) {
        if (err) throw err;
        // Call deleteProduct AFTER the UPDATE completes
      }
    );
    start();
  });
}

// NOTE question arrays for Inquirer ======================================

const menu = {
  type: "list",
  message: "What would you like to do?",
  name: "menu",
  choices: [
    "View all employees",
    "Add an employee",
    "Update an employee's info",
    "EXIT",
  ],
};

const addEmployee = [
  {
    type: "input",
    message: "Enter employee's first name:",
    name: "firstname",
  },
  {
    type: "input",
    message: "Enter employee's last name:",
    name: "lastname",
  },
  {
    type: "rawlist",
    message: "Choose employee's role:",
    name: "role",
    choices: [
      "Senior Engineer",
      "Junior Engineer",
      "Accountant",
      "Sales Lead",
      "Lawyer",
    ],
    filter: (answer) => {
      if (answer === "Senior Engineer") {
        return 1;
      } else if (answer === "Junior Engineer") {
        return 2;
      } else if (answer === "Accountant") {
        return 3;
      } else if (answer === "Sales Lead") {
        return 4;
      } else {
        return 5;
      }
    },
  },
  {
    type: "rawlist",
    message: "Choose employee's manager:",
    name: "manager",
    choices: ["John Domer", "Lexi Zotov", "Alan Clarke", "None"],
    filter: (answer) => {
      if (answer === "John Domer") {
        return 1;
      } else if (answer === "Lexi Zotov") {
        return 2;
      } else if (answer === "Alan Clarke") {
        return 3;
      } else {
        return "null";
      }
    },
  },
];
