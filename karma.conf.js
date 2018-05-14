module.exports = function setup(config) {
  config.set({
    files: [
      'specs/**/*.spec.js',
    ],

    // Test frameworks
    frameworks: ['mocha'],
    client: {
      mocha: { reporter: 'html' },
    },

    // Browsers
    browsers: ['PhantomJS', 'ChromeHeadlessNoSandbox', 'FirefoxHeadless'],
    customLaunchers: {
      // Workaround for https://github.com/travis-ci/travis-ci/issues/8836
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },

    // Preprocessorcs
    preprocessors: {
      'specs/**/*.spec.js': ['webpack'],
    },
    webpack: {
      module: {
        rules: [
          { test: /\.js$/, use: 'babel-loader', exclude: [/\/node_modules\//] },
        ],
      },
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'minimal',
    },

    // Reporting
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [{ type: 'json' }],
    },
  });
};
