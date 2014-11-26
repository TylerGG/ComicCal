angular.module('comicCal', ['ngRoute', 'ui.bootstrap'])
.run(['$rootScope',function($rootScope) {
	$rootScope.root_url = 'http://127.0.0.1:3000';
	/*
	addthisevent.settings({
		license   : "aao8iuet5zp9iqw5sm9z",
		mouse     : false,
		css       : true,
		outlook   : {show:true, text:"Outlook Calendar"},
		google    : {show:true, text:"Google Calendar"},
		yahoo     : {show:true, text:"Yahoo Calendar"},
		hotmail   : {show:true, text:"Hotmail Calendar"},
		ical      : {show:true, text:"iCal Calendar"},
		facebook  : {show:true, text:"Facebook Event"},
		dropdown  : {order:"outlook,google,ical"},
		callback  : ""
	});
	*/
}])
.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'http://127.0.0.1:3000'
	]);
});
