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
    browsers: ['PhantomJS', process.env.TRAVIS ? 'ChromeWithoutSandbox' : 'Chrome', 'Firefox'],
    customLaunchers: {
      ChromeWithoutSandbox: { base: 'Chrome', flags: ['--no-sandbox'] },
    },

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
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [{ type: 'json' }],
    },
  });
};
