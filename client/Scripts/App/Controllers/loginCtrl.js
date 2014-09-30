"use strict";
var app = angular.module('comicCal');

app.controller('LoginCtrl', ['$scope' ,  function($scope) {
	$scope.login = function() {
		alert("login");
	};

	$scope.register = function() {
		alert("register")
	};
}]);