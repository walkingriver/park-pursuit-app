// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions: {
        mobileEmulation: {
          'deviceName': 'iPhone 6/7/8 Plus'
        }
      }
    }, {
      browserName: 'chrome',
      chromeOptions: {
        mobileEmulation: {
          'deviceName': 'iPad Pro'
        }
      }
    }, {
      browserName: 'chrome',
      chromeOptions: {
        mobileEmulation: {
          'deviceName': 'Galaxy S5'
        }
      }
    }, {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--user-agent="Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4"'],

        mobileEmulation: {
          "device": 'iPhone Xr',
          "deviceMetrics": {
            "width": 414,
            "height": 896,
            "pixelRatio": 3.0
          }
        }
      }
    }],
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
