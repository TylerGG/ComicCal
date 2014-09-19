var mongoose = require('mongoose')

var PublisherSchema = new mongoose.Schema({
	name: { type:String,require:true, index:{unique:true}}
});

module.exports = mongoose.model('Publisher',PublisherSchema);
