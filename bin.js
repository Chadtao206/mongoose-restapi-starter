#!/usr/bin/env node
import inquirer from "inquirer";
import ora from "ora";
import { writeFileSync, mkdirSync } from "fs";
import { execSync } from "child_process";
import lib from "./lib/index.js";

const main = async () => {
  const { wantHelp } = await inquirer.prompt({
    message:
      "Welcome to bootcamp homework starter, would you like some assistance with your homework?",
    type: "confirm",
    name: "wantHelp",
  });

  if (!wantHelp) {
    console.log("OK BYE!");
    process.exit();
  }

  const { homework } = await inquirer.prompt({
    message: "What homework would you like to start?",
    type: "list",
    name: "homework",
    choices: Object.keys(lib),
  });

  console.log("✨✨✨ I GOT YOU FAM! ✨✨✨");
  const spinner = ora("Generating your files...").start();
  const { directories, files, message } = lib[homework];
  directories.forEach((d) => mkdirSync(d, { recursive: true }));
  files.forEach((f) => writeFileSync(f.path, f.content));
  spinner.color = "yellow";
  spinner.text = "All your files have been created, installing dependencies...";
  setTimeout(() => {
    execSync("npm install");
    spinner.color = "green";
    spinner.text = message;
    process.exit();
  }, 1000);
};

main();
