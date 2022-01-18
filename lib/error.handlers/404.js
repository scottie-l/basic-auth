'use strict';

function notFound(req, res, next) {
  console.log('Error, no route found');
  res.status(404).send('OOPs! Nothing found');
}

module.exports = notFound;
