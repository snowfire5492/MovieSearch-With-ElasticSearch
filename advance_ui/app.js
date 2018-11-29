var searchApp = angular.module('searchApp', []);

  searchApp.controller('SearchController', ['$scope','$http',function($scope, $http) {
    var searchQuery = this;

    searchQuery.search = function() {
	//console.log(searchQuery.queryString);
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
