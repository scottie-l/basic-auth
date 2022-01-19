'use strict'

const express = require('express');
const basicAuth = require('./auth/basicAuth');
const router = express.Router();
// const base64 = require('base-64');
// const bcrypt = require('bcrypt');

// encoding and decoding:
router.post('/signIn', basicAuth, async (req, res) => {
    console.log('Hello from signIn');
    let user = req.body.user;
    res.status(200).json(user);
});

module.exports = router;

// test with httpie
// http post :3000/signin -a john:foo
