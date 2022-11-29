const packageJSON = `
{
    "name": "mern-server",
    "version": "1.0.0",
    "description": "",
    "main": "server.js",
    "scripts": {
      "start": "node server.js",
      "watch": "nodemon"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "express": "^4.17.1",
      "mongoose": "^6.0.13"
    },
    "devDependencies": {
      "nodemon": "^2.0.3"
    }
  }
`;

const gitIgnore = `
.DS_Store
node_modules
`;

const server = `
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(\`API server running on port \${PORT}!\`);
  });
});
`;

const connection = `
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;
`;

const modelIndex = `
const User = require('./User');
const Thought = require('./Thought');
const Reaction = require("./Reaction")

module.exports = { User, Thought, Reaction };
`;

const reactionModel = `
const { Schema, Types, model} = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const Reaction = model('Reaction', reactionSchema)

module.exports = Reaction;
`;

const thoughtModel = `
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true
    },
    reactions: [{
      type: Schema.Types.ObjectId,
      ref: 'Reaction',
    }],
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

`;

const userModel = `
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
`;

const routesIndex = `
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;
`;

const thoughtRoutes = `
const router = require('express').Router();
const { Thought, Reaction} = require('../../models')

//TODO: ROUTE TO GET ALL THOUGHTS
router.get('/', (req,res)=> {

})

//TODO: ROUTE TO CREATE A NEW THOUGHT
router.post('/', (req,res)=> {

});

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.get('/:thoughtId', (req,res)=> {

})

//TODO: ROUTE TO UPDATE A THOUGHT
router.put('/', (req,res)=> {

})

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete('/:thoughtId', (req,res)=> {

});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post('/:thoughtId/reactions', (req,res)=> {

});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete('/:thoughtId/reactions/:reactionId', (req,res)=> {

})

module.exports = router;
`;

const userRoutes = `
const router = require('express').Router();
const {User} = require("../../models")

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
router.get('/', (req,res)=> {

})

//TODO - ROUTE THAT CREATES A NEW USER
router.post('/', (req,res)=> {

});

//TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
router.get('/:userId', (req,res) => {

})

//TODO - ROUTE THAT UPDATES A SINGLE USER
router.put('/:userId', (req,res)=> {

})

//TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.delete('/:userId', (req,res)=> {

});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
router.put('/:userId/friends/:friendId', (req,res)=> {

})

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete('/:userId/friends/:friendId', (req,res)=> {
  
});

module.exports = router;
`;

const apiRoutesIndex = `
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
`;

module.exports = {
  directories: ["config", "models", "routes/api"],
  files: [
    { path: "./package.json", content: packageJSON },
    { path: "./.gitignore", content: gitIgnore },
    { path: "./server.js", content: server },
    { path: "./config/connection.js", content: connection },
    { path: "./models/index.js", content: modelIndex },
    { path: "./models/Reaction.js", content: reactionModel },
    { path: "./models/Thought.js", content: thoughtModel },
    { path: "./models/User.js", content: userModel },
    { path: "./routes/index.js", content: routesIndex },
    { path: "./routes/api/thought-routes.js", content: thoughtRoutes },
    { path: "./routes/api/user-routes.js", content: userRoutes },
    { path: "./routes/api/index.js", content: apiRoutesIndex },
  ],
};
