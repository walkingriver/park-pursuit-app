import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/games');
    });
    it('should have a title saying Saved Games', () => {
    });
  });
  describe('New game', () => {
    beforeEach(() => {
      page.navigateTo('/new-game');
    });
    it('should have a title saying New Game', () => {
      page.getPageOneTitleText().then(title => {
        expect(title).toEqual('New Game');
      });
    });
    it('should be able to create a new DAK game', async () => {
      await page.getElementByCss('#new-ak').click();
      await browser.driver.sleep(500);
      page.takeScreenshot('/dak');
    });
    it('should be able to create a new USO game', async () => {
      await page.getElementByCss('#new-uso').click();
      await browser.driver.sleep(500);
      page.takeScreenshot('/uso');
    });
  });
  describe('DAK', () => {
    it('should have a clue', () => {
      page.navigateTo('/clue/ak/4');
    });
    it('should have a clue', () => {
      page.navigateTo('/clue/ak/5');
    });
    it('should have a clue', () => {
      page.navigateTo('/clue/ak/6');
    });
  });
  
  describe('USO', () => {
    it('should have a clue', () => {
      page.navigateTo('/clue/uso/29');
    });
    it('should have a clue', () => {
      page.navigateTo('/clue/uso/10');
    });
    it('should have a clue', () => {
      page.navigateTo('/clue/uso/26');
    });
  });
});
