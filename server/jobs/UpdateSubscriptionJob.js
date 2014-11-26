var Series = require('../models/Series');
var Subscription = require('../models/Subscription');

module.exports = function(issue,done) {

	Series.findOne(issue.series_id,function(err,series) {
		
//		console.log('found series!');
		Subscription.find({series_id:issue.series_id},function(err,series) {
//			console.log('got all subscriptions');
			done();
		});

	});
};
