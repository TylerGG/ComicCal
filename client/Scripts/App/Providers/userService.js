"use strict";
var app = angular.module('comicCal');

app.service('userService', function(){
	this.login = function(userName, password) {
		alert("Login");
	};
	this.register = function(userName, password, confirmPassword) {
		alert('register');
		return "not Yet implemented";
	};
});