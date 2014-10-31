"use strict";
var app = angular.module('comicCal');

app.controller('addSeriesModalCtrl', ['$scope','$modalInstance','SeriesService', function($scope,$modalInstance, SeriesService) {

	// $modalInstance.close();


	$scope.series = null;
	SeriesService.publishers().then(function(data){
		$scope.publishers = data.data;
	})

	$scope.publisherChange = function() {
		SeriesService.seriesByPublisher($scope.publisher._id).then(function(data) {
			$scope.seriesList = data.data.series;	
		});
		$scope.series = null;
	};

	
	$scope.add = function() {
		SeriesService.subscribe($scope.series._id).then(function(res){
			alert(res.data.subscription._id);
		});
	};
	
}]);