angular.module('comicCal')
.controller('addSeriesModalCtrl', ['$scope','$modalInstance','SeriesService', function($scope,$modalInstance, SeriesService) {

	$scope.series = null;
	SeriesService.publishers().then(function(data){
		$scope.publishers = data.data;
	});

	$scope.publisherChange = function() {
		SeriesService.seriesByPublisher($scope.publisher._id).then(function(data) {
			$scope.seriesList = data.data.series;	
		});
		$scope.series = null;
	};

	$scope.add = function() {
		SeriesService.subscribe($scope.series._id).then(function(res){
			$modalInstance.close(res.data.result);
		});
	};
	
}]);
