angular.module('comicCal')
.filter('issueNum',function() {
	return function(input) {
		if(!input) return '';
		return (input - 1 > 0) ? (input - 1) : "N/A";

	}
})
.filter('releaseDate',function() {
	return function(input) {
		if(!input) return '';

		return new Date(input).toDateString();
	}
});
