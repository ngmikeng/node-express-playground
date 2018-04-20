(function($) {
  var colorStart = $('#start-colorpicker').val() || "#f00";
  var colorEnd = $('#end-colorpicker').val() || "#f88";
  $('#start-colorpicker').val(colorStart);
  $('#end-colorpicker').val(colorEnd);

  $('#start-colorpicker').spectrum({
    color: colorStart,
    change: function(tinycolor) {
      $('#start-colorpicker').val(tinycolor.toHexString());
    }
  });
  $('#end-colorpicker').spectrum({
    color: colorEnd,
    change: function(tinycolor) {
      $('#end-colorpicker').val(tinycolor.toHexString());
    }
  });
})(jQuery);