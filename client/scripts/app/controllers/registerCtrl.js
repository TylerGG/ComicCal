"use strict";
var app = angular.module('comicCal');

app.controller('RegisterCtrl', ['$scope', 'ApiKeyService','userService', function($scope,ApiKeyService,userService) {
	$scope.register = function() {
		userService.register($scope.credentials).then(function(data) {

			ApiKeyService.setApiKey(data.apiToken);
			ApiKeyService.setUserId(data.userId);
			window.location = '/';
			console.log('totally registered!');
		},function(err) {
			$scope.error = err.data.error;
		});
	};
}]);
