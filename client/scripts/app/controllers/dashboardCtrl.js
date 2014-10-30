"use strict";
var app = angular.module('comicCal');

app.controller('DashboardCtrl', ['$scope', '$modal','SeriesService','ApiKeyService', function($scope, $modal, SeriesService,ApiKeyService) {


	if(!ApiKeyService.hasCredentials()) {
		console.log('???');
		window.location = '/#/login';
	}

	SeriesService.subscribedSeries().then(function(data) {
		$scope.series = data.data;
	}); 
	$scope.unsubscribe = function( series_id ){
		$scope.series_id = series_id;
		SeriesService.unsubscribe($scope.series_id).then( function( res ) {
			alert("Done");
		});
	}


	$scope.followAnother = function() {
		var modalInstance = $modal.open({
            templateUrl: 'partials/addSeriesModal.html',
            controller: 'addSeriesModalCtrl',
            scope: $scope
        });

		modalInstance.result.then(function(results){});

	};
	
}]);
