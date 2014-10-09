"use strict";
var app = angular.module('comicCal');

app.controller('registerCtrl', ['$scope', '$log', '$modalInstance', 'userService','appLocalStorageService',  function($scope, $log, $modalInstance, userService, appStorageService) {
	$scope.error = false;
	$scope.register = function() {
		userService.register($scope.username, $scope.password, $scope.confirmPassword).success(function(result){
			appLocalStorageService.setAPIToken(result.apiToken);
			appLocalStorageService.setUser(result.userId, $scope.username);
			$modalInstance.close();
		}).error(function(msg, code) {
			$scope.error = true;
          	$log.error(msg, code);
       });
	};
}]);