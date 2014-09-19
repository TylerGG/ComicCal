var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users/login');
});

router.post('/login',function(req,res) {
	res.json(req.body);
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

module.exports = router;
