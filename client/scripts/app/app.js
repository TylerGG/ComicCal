angular.module('comicCal', ['ngRoute', 'ui.bootstrap'])
.run(['$rootScope',function($rootScope) {
	$rootScope.root_url = 'http://127.0.0.1:3000';
}])
.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'http://127.0.0.1:3000'
	]);
});
