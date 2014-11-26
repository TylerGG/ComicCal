var express = require('express');
var router = express.Router();
var Series = require('../models/Series');
var Issue = require('../models/Issue');
var Subscription = require('../models/Subscription');
var restrict = require('../filters/auth');

router.param('seriesId',function(req,res,next,id) {
	Series.findOne({_id:id},function(err,series) {
		if(err) throw err;
		req.series = series;
		next();
	});
});


//Get all series
router.get('/', function(req, res) {
	Series.find({},function(err,series) {
		if(err) throw err;
		res.json(series);
	});
});

//Get specific series
router.get('/:seriesId',function(req,res) {
	res.json(req.series);
});

router.post('/:seriesId/subscribe',restrict,function(req,res) {

	Subscription.findOne({series_id:req.series._id,user_id:req.user._id},function(err,subscription) {
		if(err) throw err;
		if(subscription) {
			res.status(400).json({'result':'Subscription already exists'});	
		} else {
			Subscription.create({series_id:req.series._id,user_id:req.user._id},function(err,subscription){
				if(err) throw err;
				res.json({'result':'OK',subscription:subscription});
			});
		}
	});
});


router.post('/:seriesId/unsubscribe',restrict,function(req,res) {

	Subscription.findOne({series_id:req.series._id,user_id:req.user._id},function(err,subscription) {
		if(err) throw err;
		if(!subscription) {
			res.status(400).json({'result':'Subscription not found.'});	
		} else {
			Subscription.remove({series_id:req.series._id,user_id:req.user._id},function(err) {
				if(err) throw err;
				res.status(200).json({'result':'OK'});
			});
		}
	});
});

//Get all issues for series
router.get('/:seriesId/issues',function(req,res) {
	Issue.find({series_id:req.series._id},function(err,series) {
		if(err)throw err;
		res.json(series);
	});
});

module.exports = router;
