#!/usr/bin/env node
const { prompt } = require("inquirer");
const fs = require("fs");
const { execSync } = require("child_process");
const lib = require("./lib.js");
prompt({
  message:
    "Welcome to mongoose restapi starter, would you like some assistance with your homework?",
  type: "confirm",
  name: "wantHelp",
}).then(({ wantHelp }) => {
  if (!wantHelp) {
    console.log("OK BYE!");
    process.exit();
  }

  console.log("✨✨✨ I GOT YOU FAM! ✨✨✨");
  console.log("Generating your files...");
  fs.writeFileSync("./package.json", lib.packageJSON);
  fs.writeFileSync("./.gitignore", lib.gitIgnore);
  fs.writeFileSync("./server.js", lib.server);

  fs.mkdirSync("config", { recursive: true });
  fs.mkdirSync("models", { recursive: true });
  fs.mkdirSync("routes", { recursive: true });
  fs.mkdirSync("routes/api", { recursive: true });

  fs.writeFileSync("./config/connection.js", lib.connection);
  fs.writeFileSync("./models/index.js", lib.modelIndex);
  fs.writeFileSync("./models/Reaction.js", lib.reactionModel);
  fs.writeFileSync("./models/Thought.js", lib.thoughtModel);
  fs.writeFileSync("./models/User.js", lib.userModel);

  fs.writeFileSync("./routes/index.js", lib.routesIndex);
  fs.writeFileSync("./routes/api/thought-routes.js", lib.thoughtRoutes);
  fs.writeFileSync("./routes/api/user-routes.js", lib.userRoutes);

  console.log("All your files have been created, installing dependencies...");
  setTimeout(() => {
    execSync("npm install");
    console.log("💩 All done! enjoy! 💩");
    process.exit();
  }, 2000);
});
