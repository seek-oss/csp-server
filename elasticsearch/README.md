* We assume you have created an AWS Elasticsearch domain using [../infrastructure](../infrastructure) or any other method
* You should be able to browse Elasticsearch with https://search-csp-server-**********.region.es.amazonaws.com

## Setting mappings template
Elasticsearch will receive data from the Node application. The way in which Elasticsearch stores and index that data is important so you can search better.

* To do this define a template in Elasticsearch running the following command:
```sh
curl -XPUT -d @mappings-template.json https://https://search-csp-server-**********.region.es.amazonaws.com/_template/cspdata
```

## Elasticsearch analysis

* If data ends in Elasticsearch you should see an index named `cspdata-YYYY.MM.DD`: https://search-csp-server-*********.ap-southeast-2.es.amazonaws.com/_cat/indices

* Browse data here https://search-csp-server-**********.region.es.amazonaws.com/_plugin/kibana

* First time you visit Kibana you need add an index pattern searching `cspdata-*` in the settings

* To test if a CSP report ends in Elasticsearch you can just send a dummy one

You can use example file  [csp-report-example.json](../example/csp-report-example.json)
```sh
curl http://localhost/reportOnly/index -H "Host: csp.yoursite.com" -XPOST -d @csp-server/example/csp-report-example.json
```

Elasticsearch management
========================
Application sends reports received by POST to Elasticsearch endpoint defined in [nodejs/config.js](./nodejs/config.js)

* See what index (indices) you have and if you are getting data into ES
https://search-csp-server-**********.region.es.amazonaws.com/_cat/indices

* Health
https://search-csp-server-**********.region.es.amazonaws.com/_cat/health

* Clear index example
```sh
curl -XDELETE https://search-csp-server-**********.region.es.amazonaws.com/cspdata-2016.07.09
```

