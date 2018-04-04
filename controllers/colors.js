const ColorsRatio = require('../libs/colorsRatio/index').ColorsRatio;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomDataWithColor(colors, dataLength, dataMinValue, dataMaxValue) {
  let colorsRatio = new ColorsRatio(colors, dataLength, dataMinValue, dataMaxValue);
  let data = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      value: getRandomArbitrary(0, 1000)
    });
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

  return data;
}


module.exports = {
  getRandomDataWithColor: getRandomDataWithColor
};