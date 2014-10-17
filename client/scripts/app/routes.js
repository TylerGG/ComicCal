"use strict";
var app = angular.module('comicCal');

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'DashboardCtrl',
		templateUrl : 'partials/dashboard.html'
	}).when('/login', {
		controller : 'LoginCtrl',
		templateUrl : 'partials/login.html'
	}).when('/register',{
		controller:'RegisterCtrl',
		templateUrl: 'partials/register.html'
	});
}]);
