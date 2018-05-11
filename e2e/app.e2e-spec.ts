import { AppPage } from './app.po';

describe('app', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display ANDREAS LORENZEN', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ANDREAS LORENZEN');
  });
});
