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

	console.log(form);
	User.findOne({username:form.username},function(err,user) {
		if(err) throw err;
		if(!user) {
			console.log('user not found?');
			res.json({error:'User not found'});
		} else {
			user.comparePassword(form.password,function(err,isMatch) {
				if(err) throw err;
				if(isMatch) {
					req.session.user = user;
					res.json({userId:user._id,apiToken:user.api_token});
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

		if(err) {
			console.log(err);
			res.json({error:"An error has occured making your account."});
		} else {

			console.log(user);
			res.json({userId:user._id,apiToken:user.api_token});
		}
	});
});

router.get('/logout',function(req,res) {
	req.session.destroy(function(err) {
		if(err) throw err;
		res.json({result:1});	
	});
});

module.exports = router;
