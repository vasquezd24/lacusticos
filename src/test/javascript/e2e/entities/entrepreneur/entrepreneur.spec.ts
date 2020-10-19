import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EntrepreneurComponentsPage, EntrepreneurDeleteDialog, EntrepreneurUpdatePage } from './entrepreneur.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Entrepreneur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let entrepreneurComponentsPage: EntrepreneurComponentsPage;
  let entrepreneurUpdatePage: EntrepreneurUpdatePage;
  let entrepreneurDeleteDialog: EntrepreneurDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Entrepreneurs', async () => {
    await navBarPage.goToEntity('entrepreneur');
    entrepreneurComponentsPage = new EntrepreneurComponentsPage();
    await browser.wait(ec.visibilityOf(entrepreneurComponentsPage.title), 5000);
    expect(await entrepreneurComponentsPage.getTitle()).to.eq('lacusticoApp.entrepreneur.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(entrepreneurComponentsPage.entities), ec.visibilityOf(entrepreneurComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Entrepreneur page', async () => {
    await entrepreneurComponentsPage.clickOnCreateButton();
    entrepreneurUpdatePage = new EntrepreneurUpdatePage();
    expect(await entrepreneurUpdatePage.getPageTitle()).to.eq('lacusticoApp.entrepreneur.home.createOrEditLabel');
    await entrepreneurUpdatePage.cancel();
  });

  it('should create and save Entrepreneurs', async () => {
    const nbButtonsBeforeCreate = await entrepreneurComponentsPage.countDeleteButtons();

    await entrepreneurComponentsPage.clickOnCreateButton();

    await promise.all([
      entrepreneurUpdatePage.setEmailInput('email'),
      entrepreneurUpdatePage.setNameInput('name'),
      entrepreneurUpdatePage.setDescriptionInput('description'),
      entrepreneurUpdatePage.setPhoneNumberInput('5'),
      entrepreneurUpdatePage.setScheduleInput('schedule'),
      entrepreneurUpdatePage.setPictureInput(absolutePath),
      entrepreneurUpdatePage.setWebSiteInput('webSite'),
      entrepreneurUpdatePage.setFacebookPageInput('facebookPage'),
      entrepreneurUpdatePage.setInstagramPageInput('instagramPage'),
      entrepreneurUpdatePage.categorySelectLastOption(),
      entrepreneurUpdatePage.userSelectLastOption(),
    ]);

    expect(await entrepreneurUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await entrepreneurUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await entrepreneurUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await entrepreneurUpdatePage.getPhoneNumberInput()).to.eq('5', 'Expected phoneNumber value to be equals to 5');
    expect(await entrepreneurUpdatePage.getScheduleInput()).to.eq('schedule', 'Expected Schedule value to be equals to schedule');
    expect(await entrepreneurUpdatePage.getPictureInput()).to.endsWith(
      fileNameToUpload,
      'Expected Picture value to be end with ' + fileNameToUpload
    );
    expect(await entrepreneurUpdatePage.getWebSiteInput()).to.eq('webSite', 'Expected WebSite value to be equals to webSite');
    expect(await entrepreneurUpdatePage.getFacebookPageInput()).to.eq(
      'facebookPage',
      'Expected FacebookPage value to be equals to facebookPage'
    );
    expect(await entrepreneurUpdatePage.getInstagramPageInput()).to.eq(
      'instagramPage',
      'Expected InstagramPage value to be equals to instagramPage'
    );
    const selectedActivated = entrepreneurUpdatePage.getActivatedInput();
    if (await selectedActivated.isSelected()) {
      await entrepreneurUpdatePage.getActivatedInput().click();
      expect(await entrepreneurUpdatePage.getActivatedInput().isSelected(), 'Expected activated not to be selected').to.be.false;
    } else {
      await entrepreneurUpdatePage.getActivatedInput().click();
      expect(await entrepreneurUpdatePage.getActivatedInput().isSelected(), 'Expected activated to be selected').to.be.true;
    }

    await entrepreneurUpdatePage.save();
    expect(await entrepreneurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await entrepreneurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Entrepreneur', async () => {
    const nbButtonsBeforeDelete = await entrepreneurComponentsPage.countDeleteButtons();
    await entrepreneurComponentsPage.clickOnLastDeleteButton();

    entrepreneurDeleteDialog = new EntrepreneurDeleteDialog();
    expect(await entrepreneurDeleteDialog.getDialogTitle()).to.eq('lacusticoApp.entrepreneur.delete.question');
    await entrepreneurDeleteDialog.clickOnConfirmButton();

    expect(await entrepreneurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
