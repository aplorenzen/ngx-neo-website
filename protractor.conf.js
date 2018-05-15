// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/* Sources for headless chrome config:
  https://github.com/angular/protractor/issues/4695
  https://github.com/GoogleChrome/puppeteer/issues/679
 */

const { SpecReporter } = require('jasmine-spec-reporter');
const puppeteer = require('puppeteer');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': process.env.PROTRACTOR_BROWSER || 'chrome',
    chromeOptions: {
      args: ['--headless', '--no-sandbox', '--disable-gpu'],
      binary: puppeteer.executablePath()
    }
  },
  // Only works with Chrome and Firefox
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    // Better console spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
