"use strict";
var app = angular.module('comicCal');

app.controller('LoginCtrl', ['$scope' , '$SeriesFactory', function($scope, $SeriesFactory) {
	$scope.login = function() {
		alert("login");
	};

	$scope.register = function() {
		alert("register")
	};

	$scope.series = $SeriesFactory.subscribedSeries();

}]);