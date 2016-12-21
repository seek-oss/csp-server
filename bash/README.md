# Bash scripts

Bash scripts used in this project:

#### `rotate-elasticsearch-index.sh`
 
This script receives as parameters:

* the URL of the ElasticSearh server, example: https://search-something.somewhere.es.amazonaws.com
* the number of days to keep: 30
* the string to match the indexes you want to delete, example: cspdata

Script will then:

1. Get all the indexes names from https://search-something.somewhere.es.amazonaws.com/_cat/indices
2. Match the ones that containg the string
3. Find the date in the index name
4. Those that have a date older than the days to keep will be delete
5. Any other index will be ignored and kept

#### Installation

1. Edit `cron.d_rotate-elasticsearch-index` and amend path to the script and elasticsearch URL
2. Run this command:

```
sudo cp ./bash/cron.d_rotate-elasticsearch-index /etc/cron.d/rotate-elasticsearch-index
```
