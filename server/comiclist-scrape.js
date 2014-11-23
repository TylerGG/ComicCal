var comiclist = require('comic-list'),
	async = require('async'),
	mongoose = require('mongoose'),
	Series = require('./models/Series'),
	Publisher = require('./models/Publisher'),
	Issue = require('./models/Issue'),
	connectionString = require('./config').mongo;

mongoose.connect(connectionString);
var db = mongoose.connection;
db.on('error',function(err) {
	console.log('error connecting to db');
	throw err;
});


//called after async.eachSeries, kills scraper process
function onCompletion(err) {
	if(err) throw err;
	console.log('done');
	process.exit();
}

comiclist(function(issues) {

	var opts = {upsert:true};
	async.eachSeries(issues,function(issue,cb) {

		//don't bother with hardcovers n such
		if(!issue.type ||
			!issue.title ||
			!issue.issue_num ||
			!issue.release_date ||
			issue.type !== 'single issue') {
			cb();
			return;
		}

		Publisher.findOneAndUpdate({name:issue.publisher},{name:issue.publisher},opts,function(err,publisher) {
			if(err) throw err;

			//bug in comic-list not extracting titles from some random issues
			var title = issue.title || issue.raw_name;
			
			Series.findOneAndUpdate({name:title,publisher_id:publisher._id},{name:title,publisher_id:publisher._id},opts,function(err,series) {
				if(err) throw err;

				Issue.findOneAndUpdate({series_id:series._id,issue_no:issue.issue_num, release_date:issue.release_date,price:2.99},{series_id:series._id,issue_no:issue.issue_num, release_date:issue.release_date,price:2.99},opts,function(err,iss) {
					if(err) throw err;
					cb();
				});
			});
		});

	},onCompletion);
});
