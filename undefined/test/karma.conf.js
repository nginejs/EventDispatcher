(function() {
  module.exports = function(config) {
    return config.set({
      basePath: '../',
      frameworks: ['jasmine'],
      exclude: [],
      port: 8080,
      logLevel: config.LOG_INFO,
      browsers: ['PhantomJS'],
      plugins: ['karma-phantomjs-launcher', 'karma-jasmine', 'karma-coverage'],
      reporters: ['progress', 'coverage'],
      autoWatch: false,
      singleRun: true,
      colors: true,
      preprocessors: {
        '**/*.js': ['coverage']
      },
      coverageReporter: {
        type: 'html',
        dir: 'coverage/'
      }
    });
  };

}).call(this);
