'use strict';

let Sequelize = require('sequelize');

const UsersSchema = (Sequelize, DataTypes) => Sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
});

module.exports = UsersSchema;
