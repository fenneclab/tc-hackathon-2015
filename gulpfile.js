var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');

var defaultBundler = browserify('app/js/app.js', { debug: false }).transform(babel, {presets: ['es2015']});

function bundle(bundler) {
  return bundler.bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build'));
}

function watch() {
  var watchifiedBundler = watchify(defaultBundler);
  bundle(watchifiedBundler);
  watchifiedBundler.on('update', function() {
    console.log('-> bundling...');
    bundle(watchifiedBundler);
  });
}

gulp.task('clean', del.bind(null, ['build']));
gulp.task('js', function() { return bundle(defaultBundler); });
gulp.task('watchify', function() { return watch(); });
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
gulp.task('lib', function() {
  gulp.src('app/js/apiGateWay-js-sdk/**/*.js', {base: 'app/js'})
    .pipe(gulp.dest('./build'));
});
gulp.task('stub', function() {
  gulp.src('app/js/stub/**/*.json', {base: 'app/js'})
    .pipe(gulp.dest('./build'));
});
gulp.task('images', function() {
  gulp.src('app/imgs/**/*', {base: 'app'})
    .pipe(gulp.dest('./build'));
});
gulp.task('watch', function() {
  gulp.watch('app/js/apiGateWay-js-sdk/**/*.js', ['lib']);
  gulp.watch('app/js/stub/**/*.json', ['stub']);
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/css/app.scss', ['sass']);
  gulp.watch('app/imgs/**/*', ['images']);
});
gulp.task('default', ['watchify', 'html', 'sass', 'lib', 'stub', 'images', 'watch']);
