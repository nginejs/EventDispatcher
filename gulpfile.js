var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sourcemaps = require('gulp-sourcemaps'),
  coffeelint = require('gulp-coffeelint'),
  coffee = require('gulp-coffee'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  karma = require('gulp-karma'),
  bump = require('gulp-bump'),

  config = {
    path: {
      src: './src',
      test: './test',
      buildSrc: './.tmp/src',
      buildTest: './.tmp/test',
      dist: './build'
    }
  };


gulp.task('build', function () {
  return gulp.src(config.path.src + '/**/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
    .pipe(sourcemaps.init())
    .pipe(coffee())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.path.buildSrc));
});


gulp.task('test-prepare', function () {
  return gulp.src(config.path.test + '/**/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
    .pipe(coffee({

    }))
    .on('error', gutil.log)
    .pipe(gulp.dest(config.path.buildTest))
});


gulp.task('test', ['test-prepare'], function () {
  return gulp.src([
    config.path.buildSrc + '/**/*.js',
    config.path.buildTest + '/spec/*.js',
  ])
  .pipe(karma({
    configFile: config.path.buildTest + '/karma.conf.js',
    action: 'run'
  }))
  .on('error', function(err) {
    throw err;
  });
});


gulp.task('bump', function(){
  gulp.src('./*.json')
  .pipe(bump({type: 'build'}))
  .pipe(gulp.dest('./'));
});


gulp.task('deploy', function () {
  return gulp.src(config.path.buildSrc + '/EventDispatcher.js')
    .pipe(gulp.dest(config.path.dist))
    .on('finish', function () {
      return gulp.src(config.path.buildSrc + '/**/*.js')
        .pipe(uglify())
        .pipe(rename({
          extname: '.min.js'
        }))
        .pipe(gulp.dest(config.path.dist));
    });
});


gulp.task('default', ['build', 'test', 'deploy'])