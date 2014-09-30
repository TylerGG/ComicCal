"use strict";
var app = angular.module('comicCal');

app.controller('addSeriesModalCtrl', ['$scope','$modalInstance','SeriesFactory', function($scope,$modalInstance, SeriesFactory) {

	// $modalInstance.close();


	$scope.series = "";
	$scope.publishers = SeriesFactory.publishers();

	$scope.publisherChange = function() {
		$scope.seriesList = SeriesFactory.seriesByPublisher($scope.publisher);
		$scope.series = "";
	};

	$scope.add = function() {
		alert('ADD!!');
	};
	
}]);