'use strict';

var bunyan = require('bunyan'),
  BunyanPrettyStream = require('bunyan-prettystream'),
  config = require('../config');

var prettyStream = new BunyanPrettyStream();
prettyStream.pipe(process.stdout);

var logger = bunyan.createLogger({
  name: config.AppName,
  streams: [{
    type: 'rotating-file',
    period: '1d',
    count: 2,
    path: config.LogFileName,
    level: config.LogLevel
  }, {
    type: 'raw',
    stream: prettyStream,
    level: config.LogLevel
  }],
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err
  }
});

module.exports = logger;
