var mongoose = require('mongoose')
var updateTimestamps = require('./util').updateTimestamps;

var PublisherSchema = new mongoose.Schema({
	name: { type:String,require:true, index:{unique:true}},
	created_at:{type:Date,require:true},
	updated_at:{type:Date,require:true}
});

PublisherSchema.pre('save',updateTimestamps);

module.exports = mongoose.model('Publisher',PublisherSchema);
