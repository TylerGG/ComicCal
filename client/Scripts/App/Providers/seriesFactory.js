"use strict";
var app = angular.module('comicCal');

/* needs refactor to call server */

app.factory('SeriesFactory', function() {
	var factory = {};

	factory.subscribedSeries = function() {
		return [{
			title : "Saga",
			publisher : "Image Comics",
			currentIssue : "22",
			nextIssueDate : "12/12/2014"
		},{
			title : "East of West",
			publisher : "Image Comics",
			currentIssue : "15",
			nextIssueDate : "1/1/2015"
		},{
			title : "DeadPool",
			publisher : "Marvel",
			currentIssue : "15",
			nextIssueDate : "1/1/2015"
		},{
			title : "Superman",
			publisher : "DC",
			currentIssue : "15",
			nextIssueDate : "1/1/2015"
		}];
	};

	factory.publishers = function() {
		return ['Marvel', 'Image Comics', 'DC'];
	};

	factory.seriesByPublisher = function (publisher) {
		return ['Sage', 'East of west', 'DeadPool', 'Superman']
	};

	return factory;
});
