"use strict";
var app = angular.module('comicCal');

app.controller('registerCtrl', ['$scope','$modalInstance', 'userService', function($scope,$modalInstance, userService) {
	$scope.register = function() {
		userService.register($scope.username, $scope.password, $scope.confirmPassword);
	};
}]);