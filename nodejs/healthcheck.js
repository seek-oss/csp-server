'use strict';

module.exports = function (req, res, next) {
  res.send(200, 'Good!');
  next();
};
