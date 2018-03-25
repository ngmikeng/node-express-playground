const express = require('express');
const router = express.Router();
const tinycolor = require('tinycolor2');
const tinygradient = require('tinygradient');
const ColorsRatio = require('../controllers/color').ColorsRatio;

function getRatioGradient(arrayColors) {
    var gradient = tinygradient(arrayColors);
    var stops = [];
    gradient.rgb(10).forEach(function(color, index, array) {
        stops.push([
            (index + 1) / 10,
            color.toHslString()
        ]);
    });

    return stops;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/* GET home page. */
router.get('/', function(req, res, next) {
	let colorsRatio = new ColorsRatio(['#000', '#cdcdcd', '#fff'], 100, 0, 1000);
	let data = [];

	for (let i = 0; i < 100; i++) {
		data.push({ value:getRandomArbitrary(0, 1000) });
	}

	data = data.map((item) => {
		let ratio = colorsRatio.calculateRatio(item.value);
		let objColor = colorsRatio.findColorByRatio(ratio);
		if (objColor && objColor.color) {
			item.color = objColor.color;
		}
		return item;
	});

  data.sort((a, b) => a.value - b.value);

  res.render('pages/color', { title: 'Color', data: data });
});

module.exports = router;
