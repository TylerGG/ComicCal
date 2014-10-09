"use strict";
var app = angular.module('comicCal');

app.controller('DashboardCtrl', ['$scope', '$modal','SeriesFactory', function($scope, $modal, SeriesFactory) {

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