var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

	if(req.session.views) {
		req.session.views++;
	} else {
		req.session.views = 1;
	}
  res.render('index', { title: 'Express',session:req.session });
});

module.exports = router;
