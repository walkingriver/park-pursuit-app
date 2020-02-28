import { AppPage } from './app.po';

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
      page.getPageOneTitleText().then(title => {
        expect(title).toEqual('Saved Games');
      });
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
