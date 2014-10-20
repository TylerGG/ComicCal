"use strict";
var app = angular.module('comicCal');

app.controller('LoginCtrl', ['$scope' ,'$modal', 'LoginService','ApiKeyService',function($scope, $modal,LoginService,ApiKeyService) {
	$scope.login = function() {
		LoginService.login($scope.credentials).then(function(data) {
			if (data.data.apiToken && data.data.userId) {
				ApiKeyService.setApiKey(data.data.apiToken);
				ApiKeyService.setUserId(data.data.userId);
				
				window.location = '/';
			}
		},function(err) {
			$scope.error = err.data.error;
			//find out what went wrong
			console.log(err);
		});
	};

	$scope.register = function() {
		var modalInstance = $modal.open({
			templateUrl : 'partials/registerModal.html',
			controller : 'registerCtrl',
			scope : $scope
		});
	};
}]);
