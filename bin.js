#!/usr/bin/env node
const { prompt } = require("inquirer");
prompt({
    message: "Welcome to mongoose restapi starter, would you like some assistance with your homework?",
    type: "confirm",
    name: "wantHelp"
}).then(({wantHelp})=> {
    console.log(wantHelp, "HELP?")
})