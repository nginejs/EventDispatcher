var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sourcemaps = require('gulp-sourcemaps'),
  coffeelint = require('gulp-coffeelint'),
  coffee = require('gulp-coffee'),
  karma = require('gulp-karma'),

  config = {
    path: {
      src: './src',
      test: './test',
      build: './.tmp',
      dist: './build'
    }
  };


gulp.task('build', function () {
  return gulp.src(config.path.src + '/**/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
    .pipe(sourcemaps.init())
    .pipe(coffee({

    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.path.build));
});


gulp.task('test-prepare', function () {
  return gulp.src(config.path.test + '/**/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
    .pipe(coffee({

    }))
    .on('error', gutil.log)
    .pipe(gulp.dest(appConfig.tmp + '/test'))
});


gulp.task('test', ['test-prepare'], function () {
  return gulp.src([
    config.path.build + '/**/*.js',
  ])
  .pipe($.karma({
    configFile: appConfig.tmp + '/test/karma.conf.js',
    action: 'run'
  }))
  .on('error', function(err) {
    // Make sure failed tests cause gulp to exit non-zero
    throw err;
  });
});


gulp.task('deploy', []);


gulp.task('default', ['build', 'test', 'deploy'])