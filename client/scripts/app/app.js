var app = angular.module('comicCal', ['ngRoute', 'ui.bootstrap','LocalStorageModule']);
app.constant('ENVIORMENT','DEV');

var SERVER_PATH = [];
SERVER_PATH["DEV"] = "http://localhost:3000/";
SERVER_PATH["PROD"] = "";

app.constant('SERVER_PATH', SERVER_PATH );
