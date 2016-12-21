#!/bin/bash
#
# "Script to rotate Elasticsearch logs given the index pattern and number of days."
# Index names must contain date string in format YYYY.MM.DD
#
abort() {
  echo "Usage: $0 <indexpattern> <elasticsearch URL> <days to keep>"
  echo "Example: $0 cspdata https://something.somewhere.es.amazonaws.com 30"
  echo $WRONG_PARAMS
  exit 1
}

if [[ "$#" -ne 3 ]] ;
then
  WRONG_PARAMS="ERROR: I need 3 paramenters."
  abort
fi

if ! [ "$3" -eq "$3" ] ;
then
  WRONG_PARAMS="ERROR: 'days to keep' is not a number"
  abort
fi

echo "=== `date` ==="

# getting all indices
INDICES=`curl $2/_cat/indices 2>&1 | grep $1 | cut -d " " -f 3`

DATE=`date -u +%Y-%m-%d -d "$3 day ago"`
DATE_INT=$(date -d $DATE +%s)

yearReg='(201[0-9]|202[0-9]|203[0-9])'   # Allows a number between 2010 and 2039
monthReg='(0[1-9]|1[0-2])'               # Allows a number between 00 and 12
dayReg='(0[1-9]|1[0-9]|2[0-9]|3[0-1])'   # Allows a number between 00 and 31
regDate="$yearReg\\.$monthReg\\.$dayReg"

while read -r line; do
  echo "-------------------------------------------"
  echo "INFO: Index: $line"
  # Finding date in index name matching 20YY.MM.DD like 2016.09.19 
  if [[ $line =~ $regDate ]] ;
  then
    INDEX_DATE=${BASH_REMATCH[0]}
    INDEX_DATE="${INDEX_DATE//./-}"
    echo "INFO: Found date: $INDEX_DATE"
  else
    echo "WARNING: No date found in index name - index ignored."
  fi

  # if index date older than today minus $3 days ago then we delete
  if [[ $INDEX_DATE ]] ;
  then
    INDEX_DATE_INT=$(date -d $INDEX_DATE +%s)

    if [ $DATE_INT -gt $INDEX_DATE_INT ];
    then
      echo "DELETE: $line is about to be deleted."
      curl -XDELETE "$2/$line"
    else
      echo "INFO: $line is less than $3 days old, doing nothing."
    fi
  fi  

done <<< "$INDICES"


