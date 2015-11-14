var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

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
};


gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });
gulp.task('copy', function() {
  gulp.watch('app/index.html', ['html']);
});
gulp.task('sass', function() {
});
gulp.task('html', function() {
  gulp.src('app/index.html')
    .pipe(gulp.dest('./build'));
});
gulp.task('default', ['watch', 'copy']);
