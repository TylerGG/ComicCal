var express = require('express');
var Publisher = require('../models/Publisher');
var Series = require('../models/Series');
var Issue = require('../models/Issue');
var router = express.Router();
var auth = require('../filters/auth');

/* GET home page. */
router.get('/', function(req, res) {
	res.json({
		name:'Comical API',
		version:'0.0.1'
	});

});


router.get('/auth',auth,function(req,res) {
	res.json({msg:'ok'});
});

/*
 * Temporary route for debugging
 */
router.get('/seed',function(req,res) {
	Publisher.findOne({name:'Marvel'},function(err,publisher) {
		if(err) throw err;
		Series.create({name:'X-Men',publisher_id:publisher._id},function(err,series) {
			if(err) throw err;
			var titles = [1,2,3,4,5,6,7,8,9,10];
			titles = titles.map(function(el) {
				return { series_id: series._id,issue_no: el, name:''+el};
			});

			Issue.create(titles,function(err) {
				if(err) throw err;
				res.json('DONE!');
			});
		});
	});
});

module.exports = router;
