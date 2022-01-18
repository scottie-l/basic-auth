'use strict';

function serverError(err, req, res, next) {
  console.error('OOPs! Its not you, its me');
  console.log(err);
  res.status(500).send('Server Error');
}

module.exports = serverError;
