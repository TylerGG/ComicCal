var express = require('express');
var async = require('async');
var router = express.Router();
var User = require('../models/User');
var Subscription = require('../models/Subscription');
var Issue = require('../models/Issue');
var restrict = require('../filters/auth');


router.post('/login',function(req,res) {
	var form = req.body;

	console.log(form);
	User.findOne({username:form.username},function(err,user) {
		if(err) throw err;
		if(!user) {
			console.log('user not found?');
			res.status(400).json({error:'User not found'});
		} else {
			user.comparePassword(form.password,function(err,isMatch) {
				if(err) throw err;
				if(isMatch) {
					req.session.user = user;
					res.json({userId:user._id,apiToken:user.api_token});
				} else {
					res.status(400).json({error:'Invalid password'});
				}
			});
		}
	});
});

router.post('/signup',function(req,res) {
	var form = req.body;

	if(form.password != form.confirm_password) {
		res.status(400).json({
			error:"Passwords do not match"
		});
	}

	User.create({
		username:form.username,
		password:form.password
	},function(err,user) {

		if(err) {
			console.log(err);
			res.status(400).json({error:"An error has occured making your account."});
		} else {

			console.log(user);
			res.json({userId:user._id,apiToken:user.api_token});
		}
	});
});

router.get('/subscriptions',restrict,function(req,res) {

	var issues = [];
	Subscription.find({'user_id': req.user._id}).populate('series_id').exec(function(err,subscriptions) {
		if(err) throw err;
		var options = {
			path:'series_id.publisher_id',
			model:'Publisher'
		};
		Subscription.populate(subscriptions,options,function(err,subscriptions) {
			async.eachSeries(subscriptions,function(subscription,cb) {

				var series_id = subscription.series_id._id;
				Issue.findOne({series_id:series_id}).sort({release_date: -1})
				.exec(function(err,issue) {
					if(err) throw err;

					issues.push(issue);
					cb();
				});

			},function(err) {
				if(err) throw err;

				for(var i =0;i < subscriptions.length;i++) {
					subscriptions[i] = subscriptions[i].toObject();
					subscriptions[i].latest_issue = issues[i];
				}

				res.json(subscriptions);
			});
		});
	});

});

module.exports = router;
