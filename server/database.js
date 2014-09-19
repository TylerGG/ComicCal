var mongoose = require('mongoose'),
	timelog = require('./util').timelog,
	connectionString = require('./config').mongo;

mongoose.connect(connectionString);
var db = mongoose.connection;

db.on('error',function(err) {
	timelog('error connecting to db');
	throw err;
});

db.once('open',function() {
	timelog('connection established');
});

module.exports = db;
