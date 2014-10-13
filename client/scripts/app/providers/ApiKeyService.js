angular.module('comicCal')
.factory('ApiKeyService',[function() {

	var self = this;

	self.getCredentials = function() { 
		return {
			api_key:self.getApiKey(),				
			user_id:self.getUserId()
		};
	};

	self.getApiKey = function() { return localStorage.getItem('api_key'); }
	self.getUserId = function() { return localStorage.getItem('user_id'); }

	self.setApiKey = function(key) {
		localStorage.setItem('api_key',key);
	};	

	self.setUserId = function(id) {
		localStorage.setItem('user_id',id);
	};
	return self;
}]);
