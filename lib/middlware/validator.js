'use strict';

module.exports = function(req, res, next) {
  if(!(req.params.id)) {
    next('There is a missing or bad ID');
  } else {
    next();
  }
};
