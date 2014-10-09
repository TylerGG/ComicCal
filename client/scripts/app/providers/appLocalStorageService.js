"use strict";
var app = angular.module('comicCal');

app.service('appLocalStorageService', function(localStorageService){
	var USER_NAME_KEY = "user_name";
	var USER_ID_KEY = "user_id";
	var API_TOKEN_KEY = "api_token_key";

	this.setAPIToken = function(token) {
		localStorageService.set(API_TOKEN_KEY, token);
	};
	this.getAPIToken = function() {
		return localStorageService.get(API_TOKEN_KEY);
	};
	this.clearAPIToken = function() {
		localStorageService.remove(API_TOKEN_KEY);
	};

	this.setUser = function(username, id) {
		localStorageService.set(USER_NAME_KEY, username);
		localStorageService.set(USER_ID_KEY, id);
	};
	this.getAPIToken = function() {
		return { 
			username : localStorageService.get(USER_NAME_KEY),
			id : localStorageService.get(USER_ID_KEY)
		};
		
	};
	this.clearAPIToken = function() {
		localStorageService.remove(USER_NAME_KEY);
		localStorageService.remove(USER_ID_KEY);
	};


});