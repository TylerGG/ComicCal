"use strict";
var app = angular.module('comicCal');

app.service('appStorageService', function(localStorageService){
	
	var API_TOKEN_KEY = 'api_token';
	var USER_ID_KEY = 'user_id';
	var USER_NAME_KEY = 'user_name';


	this.clearAPIToken = function() {
		localStorageService.remove(API_TOKEN_KEY);
	};

	this.setAPIToken = function(token) {
		localStorageService.add(API_TOKEN_KEY, token);
	};

	this.getAPIToken = function() {
		return localStorageService.get(API_TOKEN_KEY);
	}

	

	this.setUser = function(id, username) {
		localStorageService.add(USER_ID_KEY, id);
	    localStorageService.add(USER_NAME_KEY, username);
	}

	this.clearUser = function() {
	    localStorageService.remove(USER_ID_KEY);
	    localStorageService.remove(USER_NAME_KEY);
	};

	this.getUser = function() {
		return {
			username : localStorageService.get(USER_NAME_KEY),
			id : localStorageService.get(USER_NAME_KEY);
		};
	};



});