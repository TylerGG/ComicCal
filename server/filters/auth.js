var User = require('../models/User');

function restrict(req,res,next) {

	var user_id = req.query.user_id || req.get('comical-user-id');
	var api_token = req.query.api_token || req.get('comical-api-token');

	console.log('user id: ' + user_id + ' api key: ' + api_token);
	if(!api_token || !user_id) {
		throw new Error('Credentials missing');
	} else {
		User.findOne({_id:user_id,api_token:api_token},function(err,user) {
			if(err) throw err;
			if(!user) {
				res.json({msg:'Invalid credentials'});
			}
			req.user = user;
			next();
		});
	}
}

module.exports = restrict;
