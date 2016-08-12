const pkg = require('./package');

const saucelabsLaunchers = [
  // Chrome
  ['Windows 10', 'chrome', 'latest'],
  ['Windows 10', 'chrome', 'latest-1'],
  ['OS X 10.11', 'chrome', 'latest'],
  ['OS X 10.11', 'chrome', 'latest-1'],
  ['Linux', 'chrome', 'latest'],
  ['Linux', 'chrome', 'latest-1'],

  // Firefox
  ['Windows 10', 'firefox', 'latest'],
  ['Windows 10', 'firefox', 'latest-1'],
  ['OS X 10.11', 'firefox', 'latest'],
  ['OS X 10.11', 'firefox', 'latest-1'],
  ['Linux', 'firefox', 'latest'],
  ['Linux', 'firefox', 'latest-1'],

  // Internet Explorer
  ['Windows 10', 'internet explorer', '11'],
  ['Windows 8', 'internet explorer', '10'],

  // Edge
  ['Windows 10', 'microsoftedge', 'latest'],

  // Safari
  ['OS X 10.11', 'safari', '9'],
  ['OS X 10.10', 'safari', '8'],

  // Opera
  ['Linux', 'opera', '12'],

  // iOS
  ['OS X 10.11', 'iphone', '7.1'],
].reduce((launchers, [platform, browserName, version]) => {
  const base = 'SauceLabs';
  const id = `SauceLabs ${browserName} ${version} ${platform}`;
  launchers[id] = { base, platform, browserName, version }; // eslint-disable-line no-param-reassign
  return launchers;
}, {});

const customLaunchers = Object.assign({
  ChromeWithoutSandbox: { base: 'Chrome', flags: ['--no-sandbox'] },
}, saucelabsLaunchers);

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
    browsers: [
      'PhantomJS',
      process.env.TRAVIS ? 'ChromeWithoutSandbox' : 'Chrome',
      'Firefox',
    ].concat(process.env.TRAVIS ? Object.keys(saucelabsLaunchers) : []),
    customLaunchers,
    browserNoActivityTimeout: process.env.TRAVIS ? 180000 : 10000,

    // Preprocessorcs
    preprocessors: {
      'specs/**/*.spec.js': ['webpack'],
    },
    webpack: {
      module: {
        loaders: [
          { loader: 'babel', test: /\.js$/, exclude: [/\/node_modules\//] },
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
