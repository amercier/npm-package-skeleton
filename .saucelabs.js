function createLaucherConfigs(configArray, createConfig) {
  return configArray.reduce((launchers, values) => {
    const [id, config] = createConfig(...values);
    const launcher = Object.assign({ base: 'SauceLabs' }, config);
    return Object.assign({ [id]: launcher }, launchers);
  }, {});
}

const saucelabsSeleniumLaunchers = createLaucherConfigs(
  [
    ['Windows 10', 'chrome', 'latest'],
    ['Windows 10', 'chrome', 'latest-10'],
    ['macOS 10.13', 'chrome', 'latest'],
    ['Linux', 'chrome', 'latest'],

    ['Windows 10', 'firefox', 'latest'],
    ['Windows 10', 'firefox', 'latest-10'],
    ['macOS 10.13', 'firefox', 'latest'],
    ['Linux', 'firefox', 'latest'],

    ['Windows 10', 'microsoftedge', 'latest'],
    ['Windows 10', 'microsoftedge', 'latest-1'],
    ['Windows 10', 'microsoftedge', 'latest-2'],
    ['Windows 10', 'microsoftedge', 'latest-3'],

    ['Windows 10', 'internet explorer', '11'],
    ['Windows 8', 'internet explorer', '10'],

    ['macOS 10.13', 'safari', '11'],
    ['macOS 10.12', 'safari', '10'],
    ['OS X 10.11', 'safari', '9'],
    ['OS X 10.10', 'safari', '8'],
  ],
  (platform, browserName, version) => [
    `SauceLabs ${browserName} ${version} ${platform}`,
    { platform, browserName, version },
  ],
);

const saucelabsAppiumLaunchers = createLaucherConfigs(
  [
    ['iOS', '11.2', 'Safari', 'iPhone Simulator'],
    ['iOS', '10.3', 'Safari', 'iPhone Simulator'],
    ['iOS', '9.3', 'Safari', 'iPhone Simulator'],

    ['Android', '7.1', 'Chrome', 'Android GoogleAPI Emulator'],
    ['Android', '6.0', 'Chrome', 'Android GoogleAPI Emulator'],
    ['Android', '5.1', 'Browser', 'Android GoogleAPI Emulator'],
    ['Android', '4.4', 'Browser', 'Android GoogleAPI Emulator'],
  ],
  (platformName, platformVersion, browserName, deviceName) => [
    `SauceLabs ${browserName} ${platformName} ${platformVersion} ${deviceName}`,
    {
      platformName, platformVersion, browserName, deviceName,
      deviceOrientation: 'portrait'
    },
  ],
);

module.exports = Object.assign({}, saucelabsSeleniumLaunchers, saucelabsAppiumLaunchers);
