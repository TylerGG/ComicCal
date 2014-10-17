angular.module('comicCal')
.controller('NavController',['$scope','ApiKeyService',function($scope,ApiKeyService) {

	$scope.logout = function() {
		ApiKeyService.clearCredentials();
		window.location = '/';
	};

}]);
