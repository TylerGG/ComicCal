"use strict";
var app = angular.module('comicCal');

app.service('userService', function($http,$rootScope) {

	var rootUrl = $rootScope.root_url;

	this.register = function(credentials) {
		return $http.post(rootUrl + '/users/signup',credentials);
	};

});
