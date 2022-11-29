#!/usr/bin/env node
const { prompt } = require("inquirer");
const { writeFileSync, mkdirSync } = require("fs");
const { execSync } = require("child_process");
const lib = require("./lib");

const main = async () => {
  const { wantHelp } = await prompt({
    message:
      "Welcome to bootcamp homework starter, would you like some assistance with your homework?",
    type: "confirm",
    name: "wantHelp",
  });

  if (!wantHelp) {
    console.log("OK BYE!");
    process.exit();
  }

  const { homework } = await prompt({
    message: "What homework would you like to start?",
    type: "list",
    name: "homework",
    choices: Object.keys(lib),
  });

  console.log("✨✨✨ I GOT YOU FAM! ✨✨✨");
  console.log("Generating your files...");

  const { directories, files } = lib[homework];
  directories.forEach((d) => mkdirSync(d, { recursive: true }));
  files.forEach((f) => writeFileSync(f.path, f.content));

  console.log("All your files have been created, installing dependencies...");
  setTimeout(() => {
    execSync("npm install");
    console.log("💩 All done! enjoy! 💩");
    console.log("type 'nodemon' to start your application!");
    process.exit();
  }, 1000);
};

main();
