angular.module('comicCal')
.controller('DashboardCtrl', ['$scope', '$modal','SeriesService','ApiKeyService', function($scope, $modal, SeriesService,ApiKeyService) {

	if(!ApiKeyService.hasCredentials()) {
		window.location = '/#/login';
	}

	SeriesService.subscribedSeries().then(function(data) {
		$scope.series = data.data;
	}); 

	$scope.unsubscribe = function(subscription){

		var series_id = subscription.series_id._id;
		SeriesService.unsubscribe(series_id).then(function(res) {
			if(res.data.result === 'OK') {
				$scope.series.splice($scope.series.indexOf(subscription,1));
			}
			console.log(res);
		});
	}

	$scope.followAnother = function() {
		var modalInstance = $modal.open({
            templateUrl: 'partials/addSeriesModal.html',
            controller: 'addSeriesModalCtrl',
            scope: $scope
        });
		modalInstance.result.then(function(result){
			if(result === 'OK') {
				SeriesService.subscribedSeries().then(function(data) {
						$scope.series = data.data;
				}); 
			}
		});
	};
}]);
