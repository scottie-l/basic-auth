'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { User } = require('../models/index.js');

let basicAuth = async (req, res, next) => {

  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const user = await User.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      console.log('Welcome');
      req.body.user = user;
      next();
    }
  } catch (e) {
    res.status(403).send("Invalid Login");
  }
}

module.exports = basicAuth;

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