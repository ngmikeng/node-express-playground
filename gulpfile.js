var gulp = require('gulp');

// Copy third party libraries from /node_modules into ./public/vendor
gulp.task('vendor', function() {
  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./public/vendor/bootstrap'))

  // Font Awesome
  gulp.src([
      './node_modules/font-awesome/**/*',
      '!./node_modules/font-awesome/{less,less/*}',
      '!./node_modules/font-awesome/{scss,scss/*}',
      '!./node_modules/font-awesome/.*',
      '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
    .pipe(gulp.dest('./public/vendor/font-awesome'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./public/vendor/jquery'))

  // jQuery Easing
  gulp.src([
      './node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('./public/vendor/jquery-easing'))

  // jQuery spectrum colorpicker
  gulp.src([
      './node_modules/spectrum-colorpicker/spectrum.js',
      './node_modules/spectrum-colorpicker/spectrum.css'
    ])
    .pipe(gulp.dest('./public/vendor/spectrum-colorpicker'))

  // emoji-js
  // Socket.io Client
  gulp.src([
      './node_modules/emoji-js/lib/emoji.js'
    ])
    .pipe(gulp.dest('./public/vendor/emoji-js'))

  // Socket.io Client
  gulp.src([
      './node_modules/socket.io-client/dist/socket.io.js'
    ])
    .pipe(gulp.dest('./public/vendor/socket.io'))
});

// Default task
gulp.task('default', ['vendor']);
