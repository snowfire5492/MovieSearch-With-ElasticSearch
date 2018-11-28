# assignment2-info-retrieval
CS5180 Project 2 (Search Engine)


To settup elastic-search go to https://www.elastic.co/downloads/elasticsearch and download the most recent version.



curl -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/imdb/doc/_bulk?pretty' --data-binary @imdb.json


