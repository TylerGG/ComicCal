"use strict";
var app = angular.module('comicCal');

app.service('userService', function($http,$log, $q, localStorageService){
	this.login = function(userName, password) {
		
		var deferred = $q.defer();
		$http.post('users/logut',{
			username : userName,
			password : password
		}).success(function(results) {
			localStorageService.add('api_token', result.apiToken);
	    	localStorageService.add('user_id', result.userId);
	    	localStorageService.add('user_name', userName);
			deferred.resolve();
		}).error(function(msg, code) {
          deferred.reject(msg);
          $log.error(msg, code);
       });
    	
		return deferred.promise;
	};
	this.register = function(userName, password, confirmPassword) {

		var deferred = $q.defer();

		$http.post('users/signup', {
			username : userName,
			password : password,
			confirm_password : confirmPassword
		}).success(function(result){
			//after register store the token and userid in local storage
			localStorageService.add('api_token', result.apiToken);
	    	localStorageService.add('user_id', result.userId);
	    	localStorageService.add('user_name', userName);
	    	deferred.resolve();

		}).error(function(msg, code) {
          deferred.reject(msg);
          $log.error(msg, code);
       });

		return deferred.promise;
	};

	this.logout = function() {

		var deferred = $q.defer();
		$http.get('users/logut').success(function(results) {
			localStorageService.clearAll();
			deferred.resolve();
		}).error(function(msg, code) {
          deferred.reject(msg);
          $log.error(msg, code);
       });
		return deferred.promise;
	};
});