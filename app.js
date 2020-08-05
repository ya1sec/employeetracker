const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const render = require("./generateCRUD.js");

const menu = {
  type: "list",
  message: "What would you like to do?",
  name: "menu",
  choices: [
    "View all employees",
    "Add an employee",
    "Update an employee's info",
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
    type: "list",
    message: "Choose employee's role:",
    name: "role",
    choices: [
      "Senior Engineer",
      "Junior Engineer",
      "Accountant",
      "Sales Lead",
      "Accountant",
    ],
    // NOTE: corresponding role_id: [1,2.3,4,5]
    // NOTE: corresponding department_id: [1,1,2,3,4]
  },
  {
    type: "list",
    message: "Choose employee's manager:",
    name: "manager",
    choices: ["John Domer", "Lexi Zotov", "Alan Clarke", "None"],
    // NOTE: corresponding manager_id: [1,2.3,null]
    // NOTE: Make "None" = null
  },
  {
    type: "input",
    message: "Enter employee's salary",
    name: "salary",
    // NOTE: salary stored in roles.salary
  },
];

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

async function nextMember() {
  let newMember = await inquirer.prompt(nextTeamMember);
  switch (newMember.Next) {
    case "Software Engineer":
      let engineerAnswers = await inquirer.prompt(engineerQuestions);
      let engineerArr = [];
      let engineer = new Engineer(
        engineerAnswers.name,
        engineerAnswers.id,
        engineerAnswers.email,
        engineerAnswers.github
      );
      engineerArr.push(engineer);
      let htmlEngineer = render(engineerArr);
      appendFileAsync("./output/team.html", htmlEngineer);
      // console.log(engineerAnswers.name);
      nextMember();
      break;
    case "Intern":
      let internAnswers = await inquirer.prompt(internQuestions);
      let internArr = [];
      let intern = new Intern(
        internAnswers.name,
        internAnswers.id,
        internAnswers.email,
        internAnswers.school
      );
      internArr.push(intern);
      let htmlIntern = render(internArr);
      appendFileAsync("./output/team.html", htmlIntern);
      nextMember();
      break;
    case "No more employees to add":
    default:
      return;
  }
}

async function init() {
  try {
    let managerAnswers = await inquirer.prompt(managerQuestions);
    let managerArr = [];

    let manager = new Manager(
      managerAnswers.name,
      managerAnswers.id,
      managerAnswers.email,
      managerAnswers.officeNumber
    );
    managerArr.push(manager);
    // console.log(managerArr);
    let html = render(managerArr);
    appendFileAsync("./output/team.html", html);
    // console.log("success");

    nextMember();
  } catch (err) {
    console.log(err);
  }
}

init();
