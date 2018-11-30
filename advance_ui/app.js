var searchApp = angular.module('searchApp', []);

  searchApp.controller('SearchController', ['$scope','$http',function($scope, $http) {
    var searchQuery = this;
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

    searchQuery.search = function() {
      var now = new Date();
      var logEntry = "'" + searchQuery.queryString + "' queried at " + now.toString();
      console.log(logEntry);
      searchQuery.sessionInfo.queries.push(logEntry);
      searchQuery.sessionInfo.total_queries += 1;
    	$http({ method: 'GET', url: 'http://localhost:9200/imdb/_search?q=*'+searchQuery.queryString+'*' })
	//$http({ method: 'GET', url: 'test.json' })
      	.then(function (response) {
            //console.log(response.data);
            return searchQuery.results = response.data;
	    //return searchQuery.results = [{"took":1,"timed_out":false,"_shards":{"total":5,"successful":5,"skipped":0,"failed":0},"hits":{"total":0,"max_score":null,"hits":[]}}]
      	}, function (response) {

      	}
   	);
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

      //var a = document.createElement('a');
      //a.href = uri;
      //a.innerHTML = "Right-click and choose 'save as...'";
      //document.body.appendChild(a);
      // sessionData = window.open(uri,"_blank");
      // sessionData.body.appendChild(a);
      // sessionData.focus();
      var dlAnchorElem = document.getElementById('downloadAnchorElem');
      dlAnchorElem.setAttribute("href",sessionData);
      dlAnchorElem.setAttribute("download", "session-data-" + searchQuery.sessionInfo.sessionID + ".json");
      dlAnchorElem.click();
    }
  }]);

function noFilter() {
  // set string = "";
}             
function ActionFilter() {
  // set string = "Action";
}             
function AdventureFilter() { 
}             
function AnimationFilter() {
}             
function CrimeFilter() {
}             
function DocumentaryFilter() {
}             
function DramaFilter() {
}             
function FantasyFilter() {
}             
function HorrorFilter() {
}             
function MysteryFilter() {
}             
function SciFilter() {
}             
function ShortFilter() {
}             
function ThrillerFilter() {
}  
