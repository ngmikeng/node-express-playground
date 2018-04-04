const express = require('express');
const router = express.Router();
const ColorsCtrl = require('../controllers/colors');

router.get('/', function(req, res, next) {
	let data = ColorsCtrl.getRandomDataWithColor(['#000', '#cdcdcd', '#fff'], 100, 0, 1000);

	res.render('pages/color', {
		title: 'Color',
		data: data
	});
});

module.exports = router;