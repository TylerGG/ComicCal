"use strict";
var app = angular.module('comicCal');

app.factory('SeriesFactory', function() {
	var factory = {};

	factory.subscribedSeries = function() {
		return [{
			title : "Saga",
			currentIssue : "22",
			nextIssueDate : "12/12/2014"
		},{
			title : "Butts",
			currentIssue : "15",
			nextIssueDate : "1/1/2015"
		},{
			title : "other",
			currentIssue : "15",
			nextIssueDate : "1/1/2015"
		},{
			title : "whatev",
			currentIssue : "15",
			nextIssueDate : "1/1/2015"
		}];
	};

	return factory;
});
