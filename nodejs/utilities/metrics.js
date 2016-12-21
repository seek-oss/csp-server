'use strict';

var StatsD = require('node-statsd'),
  sprintf = require("sprintf-js").sprintf,
  config = require('../config');

module.exports = function(logger) {
  var client = new StatsD({
    host: config.StatsDHost,
    prefix: config.AppName + '.',
    mock: !config.StatsDHost // Assume mock if not defined
  });

  var getRequestMetricName = function(req) {
    var path = req.getPath().substring(1);
    var firstSlash = path.indexOf('/');
    var name = (firstSlash < 0) ? path : path.substring(0, firstSlash);
    return sprintf("http.%s.%s", req.method, name).toLowerCase();
  };

  var requestCounter = function(req, res, next) {
    var metric = getRequestMetricName(req);
    client.increment(metric);
    return next();
  };

  var requestTime = function(req) {
    var metric = getRequestMetricName(req);
    var totalTime = new Date().getTime() - req.time();
    client.timing(metric, totalTime);
  };

  var requestStatus = function(req, res) {
    var metric = sprintf("%s.status_code.%i", getRequestMetricName(req), res.statusCode);
    client.increment(metric);
  };

  client.socket.on('error', function(error) {
    logger.error("Error in socket: ", error);
  });

  return {
    requestCounter: requestCounter,
    requestTime: requestTime,
    requestStatus: requestStatus
  };
};

