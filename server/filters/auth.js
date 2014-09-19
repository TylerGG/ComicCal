function restrict(req,res,next) {
	if(req.session.user) {
		next();
	} else {
		req.session.error = 'Not Authorized';
		res.redirect('/users/login');
	}
}

module.exports = restrict;
