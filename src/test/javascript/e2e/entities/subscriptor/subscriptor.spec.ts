import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SubscriptorComponentsPage, SubscriptorDeleteDialog, SubscriptorUpdatePage } from './subscriptor.page-object';

const expect = chai.expect;

describe('Subscriptor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let subscriptorComponentsPage: SubscriptorComponentsPage;
  let subscriptorUpdatePage: SubscriptorUpdatePage;
  let subscriptorDeleteDialog: SubscriptorDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Subscriptors', async () => {
    await navBarPage.goToEntity('subscriptor');
    subscriptorComponentsPage = new SubscriptorComponentsPage();
    await browser.wait(ec.visibilityOf(subscriptorComponentsPage.title), 5000);
    expect(await subscriptorComponentsPage.getTitle()).to.eq('lacusticoApp.subscriptor.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(subscriptorComponentsPage.entities), ec.visibilityOf(subscriptorComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Subscriptor page', async () => {
    await subscriptorComponentsPage.clickOnCreateButton();
    subscriptorUpdatePage = new SubscriptorUpdatePage();
    expect(await subscriptorUpdatePage.getPageTitle()).to.eq('lacusticoApp.subscriptor.home.createOrEditLabel');
    await subscriptorUpdatePage.cancel();
  });

  it('should create and save Subscriptors', async () => {
    const nbButtonsBeforeCreate = await subscriptorComponentsPage.countDeleteButtons();

    await subscriptorComponentsPage.clickOnCreateButton();

    await promise.all([subscriptorUpdatePage.setEmailInput('email'), subscriptorUpdatePage.entrepreneurSelectLastOption()]);

    expect(await subscriptorUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    const selectedActivated = subscriptorUpdatePage.getActivatedInput();
    if (await selectedActivated.isSelected()) {
      await subscriptorUpdatePage.getActivatedInput().click();
      expect(await subscriptorUpdatePage.getActivatedInput().isSelected(), 'Expected activated not to be selected').to.be.false;
    } else {
      await subscriptorUpdatePage.getActivatedInput().click();
      expect(await subscriptorUpdatePage.getActivatedInput().isSelected(), 'Expected activated to be selected').to.be.true;
    }

    await subscriptorUpdatePage.save();
    expect(await subscriptorUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await subscriptorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Subscriptor', async () => {
    const nbButtonsBeforeDelete = await subscriptorComponentsPage.countDeleteButtons();
    await subscriptorComponentsPage.clickOnLastDeleteButton();

    subscriptorDeleteDialog = new SubscriptorDeleteDialog();
    expect(await subscriptorDeleteDialog.getDialogTitle()).to.eq('lacusticoApp.subscriptor.delete.question');
    await subscriptorDeleteDialog.clickOnConfirmButton();

    expect(await subscriptorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
