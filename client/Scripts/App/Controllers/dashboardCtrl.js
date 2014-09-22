"use strict";
var app = angular.module('comicCal');

app.controller('DashboardCtrl', ['$scope','SeriesFactory', function($scope, SeriesFactory) {
	$scope.test = "buttss";
	$scope.series = SeriesFactory.subscribedSeries();
}]);