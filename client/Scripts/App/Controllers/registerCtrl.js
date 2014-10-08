"use strict";
var app = angular.module('comicCal');

app.controller('registerCtrl', ['$scope', '$log', '$modalInstance', 'userService','appStorageService',  function($scope, $log, $modalInstance, userService, appStorageService) {
	$scope.register = function() {
		userService.register($scope.username, $scope.password, $scope.confirmPassword).success(function(result){
			appStorageService.setAPIToken(result.apiToken);
			appStorageService.setUser(result.userId, $scope.username);
		}).error(function(msg, code) {
          $log.error(msg, code);
       });
	};
}]);