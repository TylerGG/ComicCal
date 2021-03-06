var mongoose = require('mongoose'),
	connectionString = require('./config').mongo;

mongoose.connect(connectionString);
var db = mongoose.connection;

db.on('error',function(err) {
	console.log('error connecting to db');
	throw err;
});

db.once('open',function() {
	console.log('connection established');
});

module.exports = db;
