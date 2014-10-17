angular.module('comicCal')
.factory('ApiKeyService',[function() {

	var api_token = 'api_token';
	var user_id = 'user_id';
	var self = this;

	self.getCredentials = function() { 
		return {
			api_key:self.getApiKey(),				
			user_id:self.getUserId()
		};
	};

	self.clearCredentials = function() {
		localStorage.removeItem(api_token);
		localStorage.removeItem(user_id);
	};

	self.hasCredentials = function() {
		return (localStorage.getItem(api_token) !== null) && (localStorage.getItem(user_id) !== null);
	}

	self.getHttpHeaders = function() {
		return {
			'comical-api-token':self.getApiKey(),
			'comical-user-id':self.getUserId()
		};
	}

	self.getApiKey = function() { return localStorage.getItem(api_token); }
	self.getUserId = function() { return localStorage.getItem(user_id); }

	self.setApiKey = function(key) {
		localStorage.setItem(api_token,key);
	};	

	self.setUserId = function(id) {
		localStorage.setItem(user_id,id);
	};
	return self;
}]);
