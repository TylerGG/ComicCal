var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.ObjectId;
var findOneOrCreate = require('mongoose-find-one-or-create');
var updateSubscriptionJob = require('../jobs/UpdateSubscriptionJob');
var updateTimestamps = require('./util').updateTimestamps;

var IssueSchema = new mongoose.Schema({
	series_id: { type:ObjectId,require:true, index:{unique:true}},
	issue_no: { type:Number,require:true, index:{unique:true}},
	release_date:{type:Date,require:true},
	created_at:{type:Date,require:true},
	updated_at:{type:Date,require:true}
});

IssueSchema.plugin(findOneOrCreate);

IssueSchema.pre('save',function(next,done) {
	if(!this.created_at)  {
		console.log('This is a new issue! Fire off the subscription update job!');
	}
	next();
	updateSubscriptionJob(this,done);
});

IssueSchema.pre('save',updateTimestamps);

module.exports = mongoose.model('Issue',IssueSchema);
