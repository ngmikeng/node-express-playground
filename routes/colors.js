const express = require('express');
const router = express.Router();
const ColorsCtrl = require('../controllers/colors');

router.get('/', function(req, res, next) {
	// let data = ColorsCtrl.getRandomDataWithColor(['#000', '#cdcdcd', '#fff'], 100, 0, 1000);
  var numberColor = req.query.numberColor * 1;
  if (!numberColor) {
    numberColor = 2;
  }

	res.render('pages/color', {
		title: 'Color',
		data: [],
    numberColor: numberColor
	});
});

router.post('/', function(req, res, next) {
  let formData = req.body;
  let data = ColorsCtrl.getRandomDataWithColor([formData.colorStart, formData.colorEnd], 100, 0, 1000);

  res.render('pages/color', {
    title: 'Color submitted',
    data: data,
    colorStart: formData.colorStart,
    colorEnd: formData.colorEnd
  });
});

module.exports = router;