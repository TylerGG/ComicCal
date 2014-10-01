var express = require('express');
var Publisher = require('../models/Publisher');
var Series = require('../models/Series');
var router = express.Router();


router.param('publisherId',function(req,res,next,id) {
	Publisher.findOne({_id:id},function(err,publisher) {
		if(err) throw err;
		req.publisher = publisher;
		next();
	});
});

//Get all publishers
router.get('/', function(req, res) {
	Publisher.find({},function(err,publishers) {
		if(err) throw err;
		res.json(publishers);
	});
});

//Get single publisher
router.get('/:publisherId',function(req,res) {
	res.json(req.publisher);
});

//get all series for publisher
router.get('/:publisherId/series',function(req,res) {
	Series.find({publisher_id:req.publisher._id},function(err,series) {
		res.json({
			publisher:req.publisher,
			series:series
		});
	});
});

module.exports = router;
