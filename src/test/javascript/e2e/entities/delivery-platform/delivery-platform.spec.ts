import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DeliveryPlatformComponentsPage, DeliveryPlatformDeleteDialog, DeliveryPlatformUpdatePage } from './delivery-platform.page-object';

const expect = chai.expect;

describe('DeliveryPlatform e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let deliveryPlatformComponentsPage: DeliveryPlatformComponentsPage;
  let deliveryPlatformUpdatePage: DeliveryPlatformUpdatePage;
  let deliveryPlatformDeleteDialog: DeliveryPlatformDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DeliveryPlatforms', async () => {
    await navBarPage.goToEntity('delivery-platform');
    deliveryPlatformComponentsPage = new DeliveryPlatformComponentsPage();
    await browser.wait(ec.visibilityOf(deliveryPlatformComponentsPage.title), 5000);
    expect(await deliveryPlatformComponentsPage.getTitle()).to.eq('lacusticoApp.deliveryPlatform.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(deliveryPlatformComponentsPage.entities), ec.visibilityOf(deliveryPlatformComponentsPage.noResult)),
      1000
    );
  });

  it('should load create DeliveryPlatform page', async () => {
    await deliveryPlatformComponentsPage.clickOnCreateButton();
    deliveryPlatformUpdatePage = new DeliveryPlatformUpdatePage();
    expect(await deliveryPlatformUpdatePage.getPageTitle()).to.eq('lacusticoApp.deliveryPlatform.home.createOrEditLabel');
    await deliveryPlatformUpdatePage.cancel();
  });

  it('should create and save DeliveryPlatforms', async () => {
    const nbButtonsBeforeCreate = await deliveryPlatformComponentsPage.countDeleteButtons();

    await deliveryPlatformComponentsPage.clickOnCreateButton();

    await promise.all([deliveryPlatformUpdatePage.setNameInput('name'), deliveryPlatformUpdatePage.entrepreneurSelectLastOption()]);

    expect(await deliveryPlatformUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await deliveryPlatformUpdatePage.save();
    expect(await deliveryPlatformUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await deliveryPlatformComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last DeliveryPlatform', async () => {
    const nbButtonsBeforeDelete = await deliveryPlatformComponentsPage.countDeleteButtons();
    await deliveryPlatformComponentsPage.clickOnLastDeleteButton();

    deliveryPlatformDeleteDialog = new DeliveryPlatformDeleteDialog();
    expect(await deliveryPlatformDeleteDialog.getDialogTitle()).to.eq('lacusticoApp.deliveryPlatform.delete.question');
    await deliveryPlatformDeleteDialog.clickOnConfirmButton();

    expect(await deliveryPlatformComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
