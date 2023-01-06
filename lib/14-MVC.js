const README = `
# 14 Model-View-Controller (MVC): Tech Blog

## Your Task

Writing about tech can be just as important as making it. Developers spend plenty of time creating new applications and debugging existing codebases, but most developers also spend at least some of their time reading and writing about technical concepts, recent advancements, and new technologies. A simple Google search for any concept covered in this course returns thousands of think pieces and tutorials from developers of all skill levels!

Your task this week is to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. You’ll build this site completely from scratch and deploy it to Heroku. Your app will follow the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## User Story

\`\`\`md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
\`\`\`

## Acceptance Criteria

\`\`\`md
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
\`\`\`

## Mock-Up

The following animation demonstrates the application functionality:

![Animation cycles through signing into the app, clicking on buttons, and updating blog posts.](./Assets/14-mvc-homework-demo-01.gif) 

## Getting Started

Your application’s folder structure must follow the Model-View-Controller paradigm. You’ll need to use the [express-handlebars](https://www.npmjs.com/package/express-handlebars) package to implement Handlebars.js for your Views, use the [MySQL2](https://www.npmjs.com/package/mysql2) and [Sequelize](https://www.npmjs.com/package/sequelize) packages to connect to a MySQL database for your Models, and create an Express.js API for your Controllers.

You’ll also need the [dotenv package](https://www.npmjs.com/package/dotenv) to use environment variables, the [bcrypt package](https://www.npmjs.com/package/bcrypt) to hash passwords, and the [express-session](https://www.npmjs.com/package/express-session) and [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) packages to add authentication.

**Note**: The [express-session](https://www.npmjs.com/package/express-session) package stores the session data on the client in a cookie. When you are idle on the site for more than a set time, the cookie will expire and you will be required to log in again to start a new session. This is the default behavior and you do not have to do anything to your application other than implement the npm package.

## Grading Requirements

> **Note**: If a Challenge assignment submission is marked as “0”, it is considered incomplete and will not count towards your graduation requirements. Examples of incomplete submissions include the following:
>
> * A repository that has no code
>
> * A repository that includes a unique name but nothing else
>
> * A repository that includes only a README file but nothing else
>
> * A repository that only includes starter code

This Challenge is graded based on the following criteria:

### Technical Acceptance Criteria: 40%

* Satisfies all of the preceding acceptance criteria plus the following:

    * Application’s folder structure follows the Model-View-Controller paradigm.

    * Uses the [express-handlebars](https://www.npmjs.com/package/express-handlebars) package to implement Handlebars.js for your Views.

    * Application must be deployed to Heroku.

### Deployment: 32%

* Application deployed at live URL.

* Application loads with no errors.

* Application GitHub URL submitted.

* GitHub repository contains application code.

### Application Quality: 15%

* User experience is intuitive and easy to navigate.

* User interface style is clean and polished.

* Application resembles the mock-up functionality provided in the Challenge instructions.

### Repository Quality: 13%

* Repository has a unique name.

* Repository follows best practices for file structure and naming conventions.

* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

* Repository contains multiple descriptive commit messages.

* Repository contains quality readme file with description, screenshot, and link to deployed application.

## Review

You are required to submit BOTH of the following for review:

* The URL of the functional, deployed application.

* The URL of the GitHub repository, with a unique name and a readme describing the project.

---
© 2022 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.

`;

const ENV = `
DB_NAME='tech_blog_db'
DB_USER=''
DB_PASSWORD=''
`;

const gitIgnore = `
node_modules
.env
.DS_Store
`;

const packageJSON = `
{
    "name": "tech-blog",
    "version": "1.0.0",
    "description": "",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "dependencies": {
        "bcrypt": "^5.1.0",
        "connect-session-sequelize": "^7.1.5",
        "dotenv": "^8.2.0",
        "express": "^4.17.1",
        "express-handlebars": "^6.0.6",
        "express-session": "^1.17.3",
        "mysql2": "^2.0.1",
        "sequelize": "^6.28.0"
      }
  }
  
`;

const config = `
const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our db, JAWSDB_URL env variable is provided by heroku in production environment
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

module.exports = sequelize;

`;

const schema = `
DROP DATABASE IF EXISTS tech_blog_db;

CREATE DATABASE tech_blog_db;
`;

const commentModel = `
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Comment extends Model {}
Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'comment'
  }
);

module.exports = Comment;

`;

const postModel = `
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'post'
  }
);

module.exports = Post;

`;

const userModel = `
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config');

// create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;

`;

const modelIndex = `
// index.js establishes relationships between the models, 
//and also creates the foreign key constraights without explicitly setting them in the Models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//Posts will have a userId field connecting to user table's id column
//if a user gets deleted, all posts made by the user get deleted
Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

//Comments will have a postId field connecting to the post table's id column
//if a post is deleted, all comments on the post will be deleted as well
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

//Comments will also have a userId field connecting to the user table's id column
//If a user gets deleted, all their comments will be deleted as well
Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

//exports all 3 models as a module
module.exports = {
  User,
  Comment,
  Post
};
`;

const apiRoutes = `
//index.js inside /api combines all api routes and exports one router middleware module
const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

//userRoutes will have /user prepended to all routes
router.use('/user', userRoutes);
//postRoutes will have /post prepended to all routes
router.use('/post', postRoutes);
//commentRoutes will have /comment prepended to all routes
router.use('/comment', commentRoutes);

module.exports = router;
`;

const userRoutes = `
const router = require('express').Router();
const { User } = require('../../models');
//User routes are completed for you so you don't have to deal with setting up authentication
//Study this code to see how it works, and how it is connected to the frontend

// POST /api/users is a registration route for creating a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/users/login is a login route for an existing user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});


// POST /api/users/logout is a logout route for an existing user, 
//it also destroys the session so the user is no longer logged in
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
`

const commentRoutes = `
const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new comment
// This should be a protected route, so you'll need to use the withAuth middleware

module.exports = router;

`

const postRoutes = `
const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new post
// This should be a protected route, so you'll need to use the withAuth middleware


// TODO - create a PUT route for updating a post's title or body
// This should be a protected route, so you'll need to use the withAuth middleware


// TODO - create a DELETE route for deleting a post with a specific id
// This should be a protected route, so you'll need to use the withAuth middleware

module.exports = router;
`

const dashboardRoutes = `
// Dashboard Routes
// This is a set of routes that will be used to render the dashboard pages.
// All of these routes will be protected by the withAuth middleware function.

const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// TODO - create a GET route for / that renders the dashboard homepage
// It should display all of the posts created by the logged in user


// TODO - create a GET route for /new that renders the new post page
// It should display a form for creating a new post


// TODO - create a GET route for /edit/:id that renders the edit post page
// It should display a form for editing an existing post


module.exports = router;
`

const homeRoutes = `
// homeroutes contains all the view routes that do not require any authentication
const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// TODO - create a GET route for getting all posts
// this page can be viewed without logging in


// TODO - create a GET route for getting a single post with its id
// this page can be viewed without logging in


// This route renders the login page, which has been completed for you
router.get('/login', (req, res) => {
  //if users has an existing valid session, they will be redirected to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  //render the login view otherwise
  res.render('login');
});

// This route renders the signup page, which has been completed for you
router.get('/signup', (req, res) => {
  //if users has an existing valid session, they will be redirected to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  //render the login view otherwise
  res.render('signup');
});

module.exports = router;
`

const controllerIndex = `
//index.js in controllers acts as an entry point for all routes
//it combines all routes and exports one router middleware module
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');

//homeRoutes will have no prefix prepended to all routes
router.use('/', homeRoutes);
//dashboardRoutes will have /dashboard prepended to all routes
router.use('/dashboard', dashboardRoutes);
//apiRoutes will have /api prepended to all routes
router.use('/api', apiRoutes);

module.exports = router;

`

const withAuth = `
//withAuth middleware function is done for you to check for a userId on the session object
//if there is no userId, the user is redirected to the login page
//use this middleware function on any routes that require a user to be logged in to access
const withAuth = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;

`

const helper = `
module.exports = {
    // Helper function to format date 
    format_date: date => {
      return \`\${date.getMonth() + 1}/\${date.getDate()}/\${date.getFullYear()}\`;
    }
    //add additional custom helpers here if needed
  };
`

const css = `
/* TODO - Write your CSS here */
`

const loginView = `
{{!-- Login View boilerplate is completed for you --}}
<div class="card">
  <div class="card-header">
    <h2>Login</h2>
  </div>
  <form id="login-form" class="card-body">
    <div>
      <label for="username-input-login">Username</label>
      <input type="text" id="username-input-login" />
    </div>
    <div>
      <label for="password-input-login" class="form-label">Password</label>
      <input type="password" id="password-input-login" />
    </div>
    <button type="submit" id="login-btn" class="btn">Login!</button>
    <a type="button" href="/signup">Sign up instead</a>
  </form>
</div>

<script src="/js/login.js"></script>
`

const signupView = `
{{!-- Signup view boilerplate is completed for you --}}
<div class="card">
  <div class="card-header">
    <h2>Sign Up</h2>
  </div>
  <div id="signup" role="tabpanel">
    <form id="signup-form" class="card-body">
      <div>
        <label for="username-input-signup">Username</label>
        <input type="text" id="username-input-signup" />
      </div>
      <div>
        <label for="password-input-signup">Password</label>
        <input type="password" id="password-input-signup" />
      </div>
      <button type="submit" id="signup-btn" class="btn" >Signup!</button>
      <a href="/login">Login instead</a>
    </form>
  </div>
</div>

<script src="/js/signup.js"></script>
`

const mainLayout = `
{{!-- A boilerplate main layout is completed for you, feel free to modify and style to your liking --}}
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Tech Blog</title>
  <link rel="stylesheet" href="/css/style.css">
</head>

<body>
  <nav class="navbar">
    <ul>
      <li class="nav-item"><a href="/">Home</a></li>
      <li class="nav-item"><a href="/dashboard">Dashboard</a></li>
      <li class="nav-item"><a href="/login">Login</a></li>
      <li class="nav-item"><a href="#" id="logout-link">Logout</a></li>
    </ul>
  </nav>
  <header class="hero">
    <h1 class="app-title"><a href="/">The Tech Blog</a></h1>
  </header>

  <main>
    {{{body}}}
  </main>
</body>

</html>
<script>
  const logout = async function() {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out');
  }
};

document.querySelector('#logout-link').addEventListener('click', logout);
</script>
`

const dashboardLayout = `
{{!-- TODO - create a dashboard layout to render dashboard pages with --}}
`

const loginJS = `
// Frontend JS for login page, this is loaded via the script tag in the login.handlebars file
const loginFormHandler = async function(event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-input-login');
  const passwordEl = document.querySelector('#password-input-login');

  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to login');
  }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);

`

const signupJS = `
// Frontend JS for signup page, this is loaded via the script tag in the signup.handlebars file
const signupFormHandler = async function(event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-input-signup');
  const passwordEl = document.querySelector('#password-input-signup');

  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to sign up');
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
`

const server = `
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/config');
//connect-session-sequelize sets up a session store table in the database, to replace in-memory storage
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//session configuration object, refer to express-session documentation to modify configs
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

//apply session middleware
app.use(session(sess));
//create handlebars instance and add custom helper functions
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//body parsing, url encoding, and static path middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//apply routing middleware
app.use(require('./controllers/'));

//turn on connection to db and server
app.listen(PORT, () => {
  console.log(\`App listening on port \${PORT}!\`);
  sequelize.sync({ force: false });
});

`

export default {
  directories: [
    "config",
    "controllers/api",
    "db",
    "models",
    "public/css",
    "public/js",
    "utils",
    "views/layouts",
  ],
  files: [
    { path: "README.md", content: README },
    { path: ".env", content: ENV },
    { path: ".gitignore", content: gitIgnore },
    { path: "package.json", content: packageJSON },
    { path: "config/index.js", content: config },
    { path: "db/schema.sql", content: schema },
    { path: "models/Comment.js", content: commentModel },
    { path: "models/Post.js", content: postModel },
    { path: "models/User.js", content: userModel },
    { path: "models/index.js", content: modelIndex },
    { path: "controllers/api/index.js", content: apiRoutes },
    { path: "controllers/api/userRoutes.js", content: userRoutes },
    { path: "controllers/api/commentRoutes.js", content: commentRoutes },
    { path: "controllers/api/postRoutes.js", content: postRoutes },
    { path: "controllers/dashboardRoutes.js", content: dashboardRoutes },
    { path: "controllers/homeRoutes.js", content: homeRoutes },
    { path: "controllers/index.js", content: controllerIndex },
    { path: "utils/auth.js", content: withAuth },
    { path: "utils/helpers.js", content: helper },
    { path: "public/css/style.css", content: css },
    { path: "views/login.handlebars", content: loginView },
    { path: "views/signup.handlebars", content: signupView },
    { path: "views/layouts/main.handlebars", content: mainLayout },
    { path: "views/layouts/dashboard.handlebars", content: dashboardLayout },
    { path: "public/js/login.js", content: loginJS },
    { path: "public/js/signup.js", content: signupJS },
    { path: "server.js", content: server },
  ],
};
