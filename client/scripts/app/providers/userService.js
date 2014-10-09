"use strict";
var app = angular.module('comicCal');

app.service('userService', function($http,$log, $q, localStorageService, ENVIORMENT, SERVER_PATH){
	this.login = function(userName, password) {
		return $http.post(SERVER_PATH[ENVIORMENT] + 'users/login',{
			username : userName,
			password : password
		});
	};
	this.register = function(userName, password, confirmPassword) {
		return $http.post(SERVER_PATH[ENVIORMENT] + 'users/signup', {
			username : userName,
			password : password,
			confirm_password : confirmPassword
		});
	};

	this.logout = function() {
		return $http.get(SERVER_PATH[ENVIORMENT] + 'users/logut');
	};
});