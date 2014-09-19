var express = require('express');
var router = express.Router();
var User = require('../models/User');
var restrict = require('../filters/auth');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users/login');
});

router.post('/login',function(req,res) {
	var form = req.body;
	User.findOne({username:form.username},function(err,user) {
		if(err) throw err;
		if(!user) {
			console.log('user not found?');
			res.redirect('/users');
		} else {
			user.comparePassword(form.password,function(err,isMatch) {
				if(err) throw err;
				if(isMatch) {
					req.session.user = user;
					res.redirect('/users/test');
				}
			});
		}
	});
});

router.get('/signup',function(req,res) {
	res.render('users/signup');
});

router.post('/signup',function(req,res) {
	var form = req.body;
	if(form.password != form.confirm_password) {
		res.json({
			error:"Passwords do not match"
		});
	}

	User.create({
		username:form.username,
		password:form.password
	},function(err,user) {
		req.session.user = user;
		res.json(req.session);
	});
});

router.get('/logout',function(req,res) {
	req.session.destroy(function(err) {
		if(err) throw err;
		res.redirect('/');
	});
});

router.get('/test',restrict,function(req,res) {
	res.end('you are authed');
});




module.exports = router;
