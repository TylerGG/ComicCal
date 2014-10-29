"use strict";
var app = angular.module('comicCal');

app.controller('addSeriesModalCtrl', ['$scope','$modalInstance','SeriesService', function($scope,$modalInstance, SeriesService) {

	// $modalInstance.close();


	$scope.series = "";
	SeriesService.publishers().then(function(data){
		$scope.publishers = data;
	})

	$scope.publisherChange = function() {
		SeriesService.seriesByPublisher($scope.publisher).then(function(data) {
			$scope.seriesList = data;	
		});
		$scope.series = "";
	};

	$scope.add = function() {
		alert('ADD!!');
	};
	
}]);