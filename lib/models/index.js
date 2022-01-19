'use strict';

require('dotenv').config;

// const sequelize = require('sequelize');
const { Sequelize, DataTypes } = require('sequlize');
const UsersSchema = require('./userSchema.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

const option = process.env.NODE_ENV === 'production'
    ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
}
: {};

const sequlize = new Sequelize(DATABASE_URL, options);

module.exports = {
    db: sequelize, 
    UsersSchema,
};
