"use strict";
var app = angular.module('comicCal');

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'DashboardCtrl',
		templateUrl : 'Partials/dashboard.html'
	}).when('/login', {
		controller : 'LoginCtrl',
		templateUrl : 'Partials/login.html'
	});
}]);