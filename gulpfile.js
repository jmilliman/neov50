var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var autoprefixer = require('gulp-autoprefixer');

//var mamp = require('gulp-mamp');
//var options = {};
//options.port = 3000;
//options.site_path = '~/documents/dev/projects/neov40/dev';
//
//
//// Start MAMP
////options.site_path = '~/documents/dev/projects/neov40';
//
//gulp.task(options, 'config', function(cb) {
//  mamp(options, 'config', cb);
//});
//
//gulp.task('start', function(cb) {
//  mamp(options, 'start', cb);
//  });
//
//gulp.task('stop', function(cb) {
//  mamp(options, 'stop', cb);
//  });
//
//gulp.task('mamp', ['start']);
//



gulp.task('clean-dist', function() {
  return del.sync('dist');
  })

gulp.task('sass', function() {
  return gulp.src('dev/scss/**/*.scss')
  .pipe(sass())
  .pipe(autoprefixer( {
    browsers: ['last 2 versions'],
    cascade: false
    }))
  .pipe(gulp.dest('dev/css'))
  .pipe(browserSync.reload( {stream: true}))
  });

gulp.task('browserSync', function() {
  var files = [
  './*.css',
  './*.php',
  './*.html'];

  browserSync.init({
    //proxy: 'localhost:8888',
    proxy: 'neov50.local',
  })
});

gulp.task('images', function() {
  return gulp.src('dev/images/**.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/images'))
  });

gulp.task('useref', function() {
  return gulp.src('dev/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('copyphp', function() {
  return gulp.src('dev/*.php')
  .pipe(gulp.dest('dist'))
});

gulp.task('build', function(callback) {
  runSequence('clean-dist', ['sass', 'useref', 'copyphp', 'images'], callback)
  });

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('dev/scss/**/*.scss', ['sass']);
  gulp.watch('dev/*.html', browserSync.reload);
  gulp.watch('dev/**/*.php', browserSync.reload);
  gulp.watch('dev/scripts/**/*.js', browserSync.reload);
  });

