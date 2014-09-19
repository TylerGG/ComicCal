var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.ObjectId;
var IssueSchema = new mongoose.Schema({
	name: { type:String,require:true, index:{unique:true}},
	series_id: { type:ObjectId,require:true},
	issue_no: { type:Number,require:true}
});

module.exports = mongoose.model('Issue',IssueSchema);
