var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.ObjectId;

var updateSubscriptionJob = require('../jobs/UpdateSubscriptionJob');
var updateTimestamps = require('./util').updateTimestamps;

var IssueSchema = new mongoose.Schema({
	name: { type:String,require:true, index:{unique:true}},
	series_id: { type:ObjectId,require:true},
	issue_no: { type:Number,require:true},
	release_date:{type:Date,require:true},
	created_at:{type:Date,require:true},
	updated_at:{type:Date,require:true}
});

IssueSchema.pre('save',function(next,done) {
	if(!this.created_at)  {
		console.log('This is a new issue! Fire off the subscription update job!');
	}
	next();
	updateSubscriptionJob(this,done);
});

IssueSchema.pre('save',updateTimestamps);

module.exports = mongoose.model('Issue',IssueSchema);
