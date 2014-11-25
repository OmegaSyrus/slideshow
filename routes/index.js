var express = require('express');
var router = express.Router();

/* GET home page. */

function getSlideImage (value) {
	switch (value) {
		case 1:
			return 'images/mc.jpg';
		case 2:
			return 'images/troll.png';
		case 3:
			return 'images/daft.jpg';
	}
}

router.get('/slideshow', function(req, res) {
	console.log (req.session);
	
	if (req.session.visit) {
		req.session.visit+=1;
		if (req.session.visit > 3)
			req.session.visit = 1;
	} else req.session.visit = 1;
	
	res.render('index', { image: getSlideImage(req.session.visit)});
});


module.exports = router;
