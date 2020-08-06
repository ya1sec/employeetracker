// TODO: add more cases to if statement in role and manager IDs in addEmployee questions

// NOTE DEPENDENCIES ==================================================
var mysql = require("mysql");
var inquirer = require("inquirer");

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
      //   if (answer.role === "Senior Engineer") {
      //     connection.query("INSERT INTO employees SET ?", {
      //       role_id: 1,
      //     });
      //   } else if (answer.role === "Junior Engineer") {
      //     connection.query("INSERT INTO employees SET ?", {
      //       role_id: 2,
      //     });
      //   } else if (answer.role === "Accountant") {
      //     connection.query("INSERT INTO employees SET ?", {
      //       role_id: 3,
      //     });
      //   } else if (answer.role === "Sales Lead") {
      //     connection.query("INSERT INTO employees SET ?", {
      //       role_id: 4,
      //     });
      //   } else {
      //     connection.query("INSERT INTO employees SET ?", {
      //       role_id: 5,
      //     });
      //   }
      //   if (answer.manager === "John Domer") {
      //     connection.query("INSERT INTO employees SET ?", {
      //       manager_id: 1,
      //     });
      //   } else if (answer.manager === "Lexi Zotov") {
      //     connection.query("INSERT INTO employees SET ?", {
      //       manager_id: 2,
      //     });
      //   } else if (answer.manager === "Alan Clarke") {
      //     connection.query("INSERT INTO employees SET ?", {
      //       manager_id: 3,
      //     });
      //   } else {
      //     connection.query("INSERT INTO employees SET ?", {
      //       manager_id: null,
      //     });
      //   }
      start();
    });
  });

  // NOTE query the roles database to
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
      }
    },

    // function () {
    //   connection.query("SELECT * FROM roles", function (err, results) {
    //     let choiceArray = [];
    //     for (let i = 0; i < results.length; i++) {
    //       choiceArray.push(results[i].title);
    //     }
    //     return choiceArray;
    //   });
    // },
    // NOTE: corresponding role_id: [1,2.3,4,5]
    // NOTE: corresponding department_id: [1,1,2,3,4]
  },
  {
    type: "rawlist",
    message: "Choose employee's manager:",
    name: "manager",
    choices: ["John Domer", "Lexi Zotov", "Alan Clarke", "None"],
    filter: (answer) => {
      if (answer === "John Domer") {
        return 1;
      }
    },

    // function () {
    //   connection.query("SELECT * FROM managers", function (err, results) {
    //     let choiceArray = [];
    //     for (let i = 0; i < results.length; i++) {
    //       choiceArray.push(results[i].manager);
    //     }
    //     return choiceArray;
    //   });
    // },
    // NOTE: corresponding manager_id: [1,2.3,null]
    // NOTE: Make "None" = null
  },
];
// NOTE SALARY PREDETERMINED BY ROLE
// {
//   type: "input",
//   message: "Enter employee's salary",
//   name: "salary",
//   // NOTE: salary stored in roles.salary
// },

const updateEmployee = [
  {
    type: "input",
    message: "What item would you like to post?",
    name: "name",
  },
  {
    type: "input",
    message: "What category would you like to place your auction in?",
    name: "category",
  },
  {
    type: "input",
    message: "What would you like your starting bid to be?",
    name: "startingbid",
  },
];
