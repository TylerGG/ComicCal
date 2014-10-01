var User = require('../models/User');

function restrict(req,res,next) {
	
	if(!req.query.token || !req.query.user_id) {
		throw new Error('Credentials missing');
	} else {
		User.findOne({_id:req.query.user_id,api_token:req.query.token},function(err,user) {
			if(err) throw err;
			if(!user) {
				res.json({msg:'Invalid credentials'});
			}
			next();
		});
	}
}

module.exports = restrict;
