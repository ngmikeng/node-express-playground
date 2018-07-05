const express = require('express');
const router = express.Router();
const ColorsCtrl = require('../controllers/colors');

router.get('/', function(req, res, next) {
	// let data = ColorsCtrl.getRandomDataWithColor(['#000', '#cdcdcd', '#fff'], 100, 0, 1000);
  let numberColor = req.query.numberColor * 1;
  if (!numberColor) {
    numberColor = 2;
  }
	res.render('pages/color', {
		title: 'Color',
		data: [],
    numberColor: numberColor
	});
});

router.post('/colorData', function(req, res, next) {
  let formData = req.body;
  let inputColors = [formData.colorStart, formData.colorEnd];
  if (formData && formData.colorMid) {
    inputColors = [formData.colorStart, formData.colorMid, formData.colorEnd];
  }
  let data = ColorsCtrl.getRandomDataWithColor(inputColors, 100, 0, 1000);

  res.render('pages/color', {
    title: 'Color submitted',
    data: data,
    colorStart: formData.colorStart,
    colorMid: formData.colorMid,
    colorEnd: formData.colorEnd
  });
});

module.exports = router;