"use strict";
var app = angular.module('comicCal');

/* needs refactor to call server */

app.factory('SeriesService',[ '$rootScope', '$http', 'ApiKeyService', function($rootScope, $http, ApiKeyService) {
	var factory = {};
	var rootUrl = $rootScope.root_url;

	factory.subscribedSeries = function(user_id) {
		var credentials = ApiKeyService.getCredentials();
		return $http.get(rootUrl + '/users/subscriptions/' + credentials.user_id,{
 			 headers: { 'comical-user-id': credentials.user_id , 'comical-api-token':credentials.api_key }
	    });
	};

	factory.publishers = function() {
		var credentials = ApiKeyService.getCredentials();
		return $http.get(rootUrl + '/publishers',{
 			 headers: { 'comical-user-id': credentials.user_id , 'comical-api-token':credentials.api_key }
	    });
	};

	factory.seriesByPublisher = function (publisher) {
		var credentials = ApiKeyService.getCredentials();
		return $http.get(rootUrl + '/publishers/' + publisher + '/series',{
 			 headers: { 'comical-user-id': credentials.user_id , 'comical-api-token':credentials.api_key }
	    });
	};

	return factory;
}]);
