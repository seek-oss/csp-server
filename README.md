CSP Server and Elasticsearch Feeder
===================================

CSP violation report endpoint using Elasticsearch as storage. Basically a https://report-uri.io/ alternative.

It is a Node.js application designed to receive CSP (Content Security Policy) reports and inject them in Elasticsearch for analysis.

- Node application uses http://restify.com/ framework
- The application has been tested in Ubuntu 14.04 LTS and 16.04 LTS (both 64-bit). 

## Components

* [bash](./bash) : (optional) Scripts to rotate old indexes (indices) in Elasticsearch
* [example](./example) : (optional) Example of a CSP Report this server is meant to receive
* [infrastructure](./infrastructure) : (optional) Scripts to create the server and services using AWS PowerShell CLI
* [nginx](./nginx) : Configuration file for Nginx
* [nodejs](./nodejs) : Node.js application that gets the CSP Reports and sends them to Elasticsearch

## Infrastructure

This project was implemented and tested using Amazon AWS services in the following way:

AWS EC2 (Linux) running Nginx and Node.js -> AWS Elasticsearch Service

## Install

TLDR; 
* Checkout this project in your server
```sh
git clone git@github.com:SEEK-Jobs/csp-server.git
```

* Edit `nodejs/config.js` and set the Elasticsearch URL, port and version
* Start nodejs application with `nodejs/server.js`
```sh
node ./nodejs/server.js
```

This way the Node.js appliation will listen in the configured port and process POST requests containing CSP reports.
Each POST will be sent to Elasticsearch into indices named *cspdata-YYYYMMDD*

Endpoints:

* `POST` http://localhost:9000/reportOnly/index - CSP report in json format
* `GET` http://localhost:9000/reportOnly/_healthcheck - health check

For details on how to configure a server  to support https (SSL) using Nginx, Node as service using PM2 manager, log rotation
and setting up Elasticsearch in AWS continue reading:

## 1. Create infrastructure

In this project we create the AWS resources using AWS CLI.
* EC2 in AWS running Ubuntu - Instructions here: [infrastructure](./infrastructure)
* Elasticsearch in AWS - Instructions here: [infrastructure](./infrastructure)

## 2. Configure server

* Install Nginx - Instructions here: [nginx](./nginx)

* Install Node - Instructions here: [nodejs](./nodejs)

* Configure Elasticsearch - Instructions here: [elasticsearch](./elasticsearch)

* Configure rotation scripts - Instructions here: [bash](./bash)

## 3. Get the CSP reports

Get your customers to start sending CSP reports to your server

[README2.md](./README2.md)

## Sceenshots
![](https://abadcer.com/downloads/work/kibana.png)