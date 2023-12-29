import { browser, by, element } from 'protractor';
import * as fs from 'fs';

export class AppPage {
  async navigateTo(destination) {
    await browser.get(destination);
    await this.takeScreenshot(destination);
  }

  async takeScreenshot(destination: any) {
    const png = await browser.takeScreenshot();
    const deviceName = await this.getDeviceName();
    const fileName =
      './screenshots/' + `${deviceName}/${destination}.png`.replace(/\//g, '-');
    this.writeScreenShot(png, fileName);
  }

  async getDeviceName() {
    const config = await browser.getProcessedConfig();
    const capabilities = config.capabilities || {};
    const chromeOptions = capabilities.chromeOptions || {
      mobileEmulation: { device: 'browser' },
    };
    const mobileEmulation = chromeOptions.mobileEmulation || {
      device: 'browser',
    };
    const deviceName =
      mobileEmulation.device || mobileEmulation.deviceName || 'unknown';
    console.log('Test Device:', deviceName);

    return deviceName;
  }

  // abstract writing screen shot to a file
  writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
  }

  getTitle() {
    return browser.getTitle();
  }

  getPageOneTitleText() {
    return element(by.tagName('ion-app'))
      .element(by.deepCss('ion-title'))
      .getText();
  }

  getElementByCss(css: string) {
    return element(by.deepCss(css));
  }
}
