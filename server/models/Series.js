var mongoose = require('mongoose')

var ObjectId = mongoose.Schema.ObjectId;

var SeriesSchema = new mongoose.Schema({
	name: { type:String,require:true, index:{unique:true}},
	publisher_id: { type:ObjectId,require:true}
});

module.exports = mongoose.model('Series',SeriesSchema);
