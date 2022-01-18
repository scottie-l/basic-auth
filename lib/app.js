'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors'); 
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Sequelize, DataTypes } = require('sequelize');
const { response } = require('express');

const signIn = require('./auth/signIn.js');
const signUp = require('./auth/signUp');
const notFound = require('./error.handlers/404.js');
const serverError = require('./error.handlers/500.js');
const { sign } = require('crypto');

// Prepare the express app
const app = express();

app.use(cors());

// automatically assign an encrypted password to our User. beforeCreate is a feature of sequelize models, takes a callback function
User.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
});

// Process JSON input and put the data on req.body
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));
app.use(signIn);
app.use(signUp);
app.use(notFound);
app.use(serverError);


// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
app.post('/signup', async (req, res) => {
    // let { userName, password } = req.body;
    // let newUser = await User.create({ username, password });
    // let response = {
    //     username: newUser.username,
    //     id: newUser.id,
    // };
    // res.send(response)


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
app.post('/signin', async (req, res) => {

  /*
    req.headers.authorization is : "Basic sdkjdsljd="
    To get username and password from this, take the following steps:
      - Turn that string into an array by splitting on ' '
      - Pop off the last value
      - Decode that encoded string so it returns to user:pass
      - Split on ':' to turn it into an array
      - Pull username and password from that array
  */



  /*
    Now that we finally have username and password, let's see if it's valid
    1. Find the user in the database by username
    2. Compare the plaintext password we now have against the encrypted password in the db
       - bcrypt does this by re-encrypting the plaintext password and comparing THAT
    3. Either we're valid or we throw an error
  */
  try {
    const user = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    }
    else {
      throw new Error('Invalid User')
    }
  } catch (error) { res.status(403).send("Invalid Login"); }

});

// start the server
module.exports = {
  start: (port) => {
    app.listen(port, () => {
      console.log('server is listening on port: ' + port);
    });
  },
  app,
};

// make sure our tables are created, start up the HTTP server.
// sequelize.sync()
//   .then(() => {
//     app.listen(3000, () => console.log('server up'));
//   }).catch(e => {
//     console.error('Could not start server', e.message);
//   });
// const PORT = process.env.PORT || 3000;

// server.start(PORT);