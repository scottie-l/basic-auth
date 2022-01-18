'use strict';

const express = require('express');
const router =  express.router();
const bcrypt = require('bcrypt');

const { Usersmodel } = require('../models');

router.post('./signup', create);

async function create (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await UsersModel.create(req.body);
        res.status(200).json(record);
    } catch (e) {
        console.log(e);
        res.status(403).send("Error Creating User");
    }
}

module.exports = router;
