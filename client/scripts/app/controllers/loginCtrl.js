"use strict";
var app = angular.module('comicCal');

app.controller('LoginCtrl', ['$scope' ,'$modal',  function($scope, $modal) {
	$scope.login = function() {
		alert('login');
	};

	$scope.register = function() {
		var modalInstance = $modal.open({
			templateUrl : 'partials/registerModal.html',
			controller : 'registerCtrl',
			scope : $scope
		});
	};
}]);