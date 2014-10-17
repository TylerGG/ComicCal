var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var SubscriptionSchema = new mongoose.Schema({
	series_id: { type:ObjectId, require:true, ref:'Series'},
	user_id: { type:ObjectId,require:true },
	created_at:{type:Date,require:true},
	updated_at:{type:Date,require:true}
});

SubscriptionSchema.pre('save',function(next) {
	var d = new Date();
	if(!this.created_at) this.created_at = d;
	this.updated_at = d;
	next();
});


module.exports = mongoose.model('Subscription',SubscriptionSchema);
