# assignment2-info-retrieval
CS5180 Project 2 (Search Engine)


To settup elastic-search go to https://www.elastic.co/downloads/elasticsearch and download the most recent version tar.

Unzip and make note of unzip location.

Acess elasticsearch/config/elasticsearch.yml 
          Add CORS dependencies as seen in elasticsearch.yml here on our Github
          
To run elastic-search, Access /bin via terminal and run 
                              ./elasticsearch for linux/mac 
                                            or 
                              elasticsearch.bat for windows

Go to localhost:9200 to make sure elastic search is up and running

Next download the imdb.json file located here on Github and locate the file with your terminal.

Index into elastic search using one of the following commands: 

for linux/mac
curl -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/imdb/doc/_bulk?pretty' --data-binary @imdb.json

for windows ( use powershell ) 
Invoke-RestMethod "http://localhost:9200/imdb/doc/_bulk?pretty" -Method Post -ContentType 'application/x-ndjson' -InFile "imdb.json"

Finally download the Basic UI html and js files 
              or
        download the advanced UI html and js files
        
Simple open the html file and enjoy searching!
