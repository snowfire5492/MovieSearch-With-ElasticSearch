var searchApp = angular.module('searchApp', []);

  searchApp.controller('SearchController', ['$scope','$http',function($scope, $http) {
	  
    var searchQuery = this;
    var genre = "*";
    	
    searchQuery.sessionInfo = {
      sessionID:sessionID(),
      queries:new Array,
      total_queries:0,
      clicks:new Array,
      total_clicks:0,
      start:new Date().toString()
    };

    console.log("New session (sessionID: " + searchQuery.sessionInfo.sessionID +
      ") started at " + searchQuery.sessionInfo.start);

    function sessionID() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    //~ searchQuery.search = function() {
      //~ var now = new Date();
      //~ var logEntry = "'" + searchQuery.queryString + "' queried at " + now.toString();
      //~ console.log(logEntry);
      //~ searchQuery.sessionInfo.queries.push(logEntry);
      //~ searchQuery.sessionInfo.total_queries += 1;
    	//~ $http({ method: 'GET', url: 'http://localhost:9200/imdb/_search?q=*'+searchQuery.queryString+'*' })
      	//~ .then(function (response) {
            //~ return searchQuery.results = response.data;
      	//~ }, function (response) { }
   	//~ );
    //~ };
    
    searchQuery.search = function() {
      var now = new Date();
      var logEntry = "'" + searchQuery.queryString + "' with genre specification '" +
        genre + "' queried at " + now.toString();
      console.log(logEntry);
      //console.log('{  "query": {  "bool": {  "must": [  { "wildcard": { "genre": "*'+genre+'*" } },  { "query_string": {  "query": "*'+searchQuery.queryString+'*"  }  }  ]  }  }  }');
      searchQuery.sessionInfo.queries.push(logEntry);
      searchQuery.sessionInfo.total_queries += 1;
    	$http({ method: 'POST', 
				url: 'http://localhost:9200/imdb/_search',
				data: '{  "query": {  "bool": {  "must": [  { "wildcard": { "genre": "*'+genre.substring(1,genre.length-1)+'*" } },  { "query_string": {  "query": "*'+searchQuery.queryString+'*"  }  }  ]  }  }  }'
				})
      	.then(function (response) {
            return searchQuery.results = response.data;
      	}, function (response) { }
   	);
    };
    
    searchQuery.updateGenre = function(newGenre) {
      genre = newGenre;
      //console.log(genre.substring(1,genre.length-1));
      //console.log(genre);
      return searchQuery.currentGenre = genre;
    };

    searchQuery.logURLClick = function($event) {
      var now = new Date();
      var logEntry = $event.currentTarget.href + " clicked at " + now.toString();
      console.log(logEntry);
      searchQuery.sessionInfo.clicks.push(logEntry);
      searchQuery.sessionInfo.total_clicks += 1;
    }

    searchQuery.saveSession = function() {
      var now = new Date();
      searchQuery.sessionInfo.end = now.toString();
      searchQuery.sessionInfo.timeElapsed = now.getTime() - new Date(searchQuery.sessionInfo.start).getTime();

      console.log("Session (sessionID: " + searchQuery.sessionInfo.sessionID +
      ") ended at " + searchQuery.sessionInfo.end);

      var sessionText = JSON.stringify(searchQuery.sessionInfo);
      var sessionData = "data:text/json;charset=UTF-8," + encodeURIComponent(sessionText);

      var dlAnchorElem = document.getElementById('downloadAnchorElem');
      dlAnchorElem.setAttribute("href",sessionData);
      dlAnchorElem.setAttribute("download", "session-data-" + searchQuery.sessionInfo.sessionID + ".json");
      dlAnchorElem.click();
    }
  }]);
