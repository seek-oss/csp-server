'use strict';

require('dotenv').config({silent: true});

module.exports = {
  AppName: 'csp-server',
  LogFileName: process.env.LogFileName || "./csp-server.json",
  LogLevel: process.env.LogLevel || "warn",
  ElasticSearchHost: process.env.ElasticSearchHost || "https://search-csp-server-********.****region****.es.amazonaws.com",
  Port: process.env.PORT || 9000,
  ElasticSearchVersion: process.env.ElasticSearchVersion || "master"
};
