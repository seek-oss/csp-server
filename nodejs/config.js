'use strict';

require('dotenv').config({silent: true});

module.exports = {
  AppName: 'csp-server',
  LogFileName: process.env.LogFileName || "./csp-server.json",
  LogLevel: process.env.LogLevel || "warn",
  Port: process.env.PORT || 9000,
  ElasticSearchHost: process.env.ElasticSearchHost || "https://search-csp-server-********.****region****.es.amazonaws.com",
  ElasticSearchSSLCA: process.env.ElasticSearchSSLCA || "",
  ElasticSearchSSLStrict: process.env.ElasticSearchSSLStrict || false,
  ElasticSearchVersion: process.env.ElasticSearchVersion || "master",
  ElasticSearchIndex: process.env.ElasticSearchIndex || "cspdata"
};
