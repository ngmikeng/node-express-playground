(function($) {
  var colorStart = $('#start-colorpicker').val() || "#f00";
  var colorMid = $('#mid-colorpicker').val() || "#c44";
  var colorEnd = $('#end-colorpicker').val() || "#f88";
  $('#start-colorpicker').val(colorStart);
  $('#end-colorpicker').val(colorEnd);

  $('#start-colorpicker').spectrum({
    color: colorStart,
    change: function(tinycolor) {
      $('#start-colorpicker').val(tinycolor.toHexString());
    }
  });
  $('#mid-colorpicker').spectrum({
    color: colorMid,
    change: function(tinycolor) {
      $('#mid-colorpicker').val(tinycolor.toHexString());
    }
  });
  $('#end-colorpicker').spectrum({
    color: colorEnd,
    change: function(tinycolor) {
      $('#end-colorpicker').val(tinycolor.toHexString());
    }
  });

  $('#select-colors').on('change', function(event) {
    $('#form-select-number-color').submit();
    console.log(event.target.value);
  });

  function onSelectNumberColor(event) {
    console.log(event.target.value);
  }
})(jQuery);