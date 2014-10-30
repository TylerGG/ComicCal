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

	factory.addSubscription = function(series_id){
		return $http.post(rootUrl + '/series/' + series_id + '/subscribe', {
			headers: ApiKeyService.getHttpHeaders()
		});
	};

	return factory;
}]);
