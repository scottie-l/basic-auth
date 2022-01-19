'use strict';

const express = require('express');
const { User } = require('../models/index.js');
const router = express.Router();
const bcrypt = require('bcrypt');

console.log(User);
router.post('./signup', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await User.create(req.body);
        res.status(200).json(record);
    } catch (e) {
        console.log(e);
        res.status(403).send("Error Creating User");
    }
});

module.exports = router;

// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
