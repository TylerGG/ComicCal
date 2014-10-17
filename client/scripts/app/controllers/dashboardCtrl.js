"use strict";
var app = angular.module('comicCal');

app.controller('DashboardCtrl', ['$scope', '$modal','SeriesFactory','ApiKeyService', function($scope, $modal, SeriesFactory,ApiKeyService) {


	if(!ApiKeyService.hasCredentials()) {
		console.log('???');
		window.location = '/#/login';
	}

	$scope.series = SeriesFactory.subscribedSeries();

	$scope.followAnother = function() {
		var modalInstance = $modal.open({
            templateUrl: 'partials/addSeriesModal.html',
            controller: 'addSeriesModalCtrl',
            scope: $scope
        });

		modalInstance.result.then(function(results){});

	};
	
}]);
