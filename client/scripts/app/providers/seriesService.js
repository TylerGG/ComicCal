"use strict";
var app = angular.module('comicCal');

/* needs refactor to call server */

app.factory('SeriesService',[ '$rootScope', '$http', 'ApiKeyService', function($rootScope, $http, ApiKeyService) {
	var factory = {};
	var rootUrl = $rootScope.root_url;

	factory.subscribedSeries = function(user_id) {
		return $http.get(rootUrl + '/users/subscriptions/',{
 			 headers: ApiKeyService.getHttpHeaders()
	    });
	};

	factory.publishers = function() {
		return $http.get(rootUrl + '/publishers',{
 			 headers: ApiKeyService.getHttpHeaders()
	    });
	};

	factory.seriesByPublisher = function (publisher) {
		return $http.get(rootUrl + '/publishers/' + publisher + '/series',{
 			 headers: ApiKeyService.getHttpHeaders()
	    });
	};

	factory.subscribe = function(series_id){
		var URL = rootUrl + '/series/' + series_id + '/subscribe';
		return $http({
			method: 'POST', 
			url: URL, 
			headers: ApiKeyService.getHttpHeaders()
		}).success(function(data, status, headers, config) {
			if( data.Result = "OK" ){
				alert("Subscription Added");
			}
  		});
	};
	factory.unsubscribe = function(series_id){
		var URL = rootUrl + '/series/' + series_id + '/unsubscribe';
		return $http({
			method: 'POST', 
			url: URL, 
			headers: ApiKeyService.getHttpHeaders()
		}).success(function(data, status, headers, config) {
			if( data.Result = "OK" ){
				alert("Subscription Removed");
			}
  		});
	};
	return factory;
}]);
