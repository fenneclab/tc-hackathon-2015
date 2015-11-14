var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

function compile(watch) {
  var bundler = watchify(browserify('app/js/app.js', { debug: false }).transform(babel, {presets: ['es2015']}));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
}

gulp.task('build:js', function() { return compile(); });
gulp.task('watch:js', function() { return watch(); });
gulp.task('copy', function() {
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/css/app.scss', ['sass']);
});
gulp.task('sass', function() {
  gulp.src('app/css/app.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./build'));
});
gulp.task('html', function() {
  gulp.src('app/*.html')
    .pipe(gulp.dest('./build'));
});
gulp.task('default', ['watch:js', 'copy']);
