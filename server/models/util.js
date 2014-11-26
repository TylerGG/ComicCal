var util = {}

util.updateTimestamps = function(next) {

	var d = new Date();
	if(!this.created_at) this.created_at = d;
	this.updated_at = d;
	next();

};


module.exports = util;
