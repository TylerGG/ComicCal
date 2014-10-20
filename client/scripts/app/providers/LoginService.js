angular.module('comicCal')
.factory('LoginService',['$rootScope','$http',function($rootScope,$http) {

	var self = this;
	var rootUrl = $rootScope.root_url;

	self.login = function(credentials) {
		return $http.post(rootUrl + '/users/login',credentials);
	};

	return self;
}]);
