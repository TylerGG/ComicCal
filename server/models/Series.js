var mongoose = require('mongoose')
var findOneOrCreate = require('mongoose-find-one-or-create');

var ObjectId = mongoose.Schema.ObjectId;
var updateTimestamps = require('./util').updateTimestamps;

var SeriesSchema = new mongoose.Schema({
	name: { type:String,require:true, index:{unique:true}},
	publisher_id: { type:ObjectId,require:true,ref:'Publisher'},
	created_at: { type:Date,require:true},
	updated_at: { type:Date,require:true}
});
SeriesSchema.plugin(findOneOrCreate);

SeriesSchema.pre('save',updateTimestamps);

module.exports = mongoose.model('Series',SeriesSchema);
