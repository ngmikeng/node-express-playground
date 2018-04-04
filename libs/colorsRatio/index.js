const tinycolor = require('tinycolor2');
const tinygradient = require('tinygradient');

function ColorsRatio(arrayColors, colorLength, minValue, maxValue) {
  this.ratio = 1;
  this.minValue = minValue || 0;
  this.maxValue = maxValue || 100;
  this.colorsRatio = _getRatioColorsByGradient(arrayColors, colorLength);
}

ColorsRatio.prototype.calculateRatio = function(inputValue) {
  if (inputValue >= this.minValue && inputValue <= this.maxValue) {
    return (inputValue - this.minValue) / (this.maxValue - this.minValue);
  }
  return;
}

ColorsRatio.prototype.findColorByRatio = function(ratio) {
  if (ratio) {
    return this.colorsRatio.find((color) => ratio >= color.minRatio && ratio <= color.maxRatio);
  }
  return;
}

function _getRatioColorsByGradient(arrayColors = ['#000', '#cdcdcd', '#fff'], colorLength = 10) {
  let gradient = tinygradient(arrayColors);
  let colors = [];

  gradient.rgb(colorLength).forEach((color, index, array) => {
    colors.push({
      minRatio: index / array.length,
      maxRatio: (index + 1) / array.length,
      color: color.toHslString()
    });
  });

  return colors;
}

module.exports = {
  ColorsRatio: ColorsRatio
};