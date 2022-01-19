'use strict';

// 3rd Party Resources
const express = require('express');
// const cors = require('cors'); 
// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
// const { Sequelize, DataTypes } = require('sequelize');
// const { response } = require('express');

const signIn = require('./routes/signIn.js');
const signUp = require('./routes/signUp');
const notFound = require('./error.handlers/404.js');
const serverError = require('./error.handlers/500.js');
const homeRoute = require('./routes/main.js');
const logger = require('./middlware/logger.js');

// Prepare the express app
const app = express();
// app.use(cors());

app.use(express.json()); // Process JSON input and put the data on req.body
app.use(logger);

// Import routes
app.use(homeRoute);
app.use(signIn);
app.use(signUp);

// Import error handlers 
app.use(notFound);
app.use(serverError);

module.exports = {
  server: app, 
  start : port => {
    if (!port) {
      throw new Error('missing port');
    }
    app.listen(port, () => console.log(`Server running on port: ${port}`));
  }
};


// Process FORM input and put the data on req.body
// app.use(express.urlencoded({ extended: true }));
