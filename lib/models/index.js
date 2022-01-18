'use strict';

const { Sequelize, DataTypes } = require('sequlize');
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';
const UsersSchema = require('./userSchema.js');

let db = new Sequelize(DATABASE_URL);

const UsersModel = UsersSchema(db, DataTypes);

module.exports = {
    db, 
    UsersModel,
};
