var mysql = require("mysql");

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

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readData();
});

function readData() {
  console.log("Viewing all employees...\n");
  connection.query(
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.department, managers.manager FROM employees LEFT JOIN roles ON roles.id = employees.role_id LEFT JOIN departments ON departments.id = roles.department_id LEFT JOIN managers ON managers.id = employees.manager_id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    }
  );
}
