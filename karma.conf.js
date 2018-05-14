const pkg = require('./package');

const saucelabsEnabled = process.env.SAUCE_ENABLED === 'true';
const saucelabsLaunchers = require('./.saucelabs');

module.exports = function setup(config) {
  config.set({
    files: [
      'specs/**/*.spec.js',
    ],

    // Test frameworks
    frameworks: ['mocha'],
    client: {
      mocha: {
        reporter: 'html',
        timeout: saucelabsEnabled ? 20000 : 2000,
      },
    },

    // Browsers
    browsers: ['PhantomJS', 'ChromeHeadlessNoSandbox', 'FirefoxHeadless'].concat(saucelabsEnabled ? Object.keys(saucelabsLaunchers) : []),

    customLaunchers: Object.assign({
      // Workaround for https://github.com/travis-ci/travis-ci/issues/8836
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    }, saucelabsLaunchers),

    browserDisconnectTimeout: saucelabsEnabled ? 60000 : 2000,
    browserDisconnectTolerance: saucelabsEnabled ? 1 : 0,
    browserNoActivityTimeout: saucelabsEnabled ? 4 * 60 * 1000 : 10000,
    captureTimeout: saucelabsEnabled ? 4 * 60 * 1000 : 60000,
    concurrency: saucelabsEnabled ? 5 : Infinity, // Open Sauce limit
    retryLimit: saucelabsEnabled ? 10 : 2,

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
    reporters: ['mocha', 'coverage', 'saucelabs'],
    coverageReporter: {
      reporters: [{ type: 'json' }],
    },

    // SauceLabs
    sauceLabs: {
      testName: pkg.name,
    },
  });
};
