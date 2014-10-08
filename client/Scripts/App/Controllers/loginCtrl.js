"use strict";
var app = angular.module('comicCal');

app.controller('LoginCtrl', ['$scope' ,'$modal','$log','userService','appStorageService',  function($scope, $modal, $log, userService, appStorageService) {
	$scope.login = function() {
		userService.login($scope.username,$scope.password).success(function(results) {
			appStorageService.setAPIToken(result.apiToken);
			appStorageService.setUser(result.userId, $scope.username);
		}).error(function(msg, code) {
          	$log.error(msg, code);
       });
	};

	$scope.register = function() {
		var modalInstance = $modal.open({
			templateUrl : 'Partials/registerModal.html',
			controller : 'registerCtrl',
			scope : $scope
		});
	};
}]);