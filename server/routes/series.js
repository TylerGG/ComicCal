var express = require('express');
var router = express.Router();
var Series = require('../models/Series');
var Issue = require('../models/Issue');

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

//Get all issues for series
router.get('/:seriesId/issues',function(req,res) {
	Issue.find({series_id:req.series._id},function(err,series) {
		if(err)throw err;
		res.json(series);
	});
});

module.exports = router;
