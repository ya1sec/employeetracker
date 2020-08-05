const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const bidQuestions = [
  {
    type: "list",
    message: "What auction would you like to place a bid in?",
    name: "auction",
    choices: ["iPad Pro", "Macbook Pro"],
  },
  {
    type: "input",
    message: "How much would you like to bid?",
    name: "bid",
  },
];

const postQuestions = [
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

const postOrBid = {
  type: "list",
  message: "Would you like to [POST] an aution or [BID] on an item?",
  name: "post-bid",
  choices: ["BID", "POST"],
};
