import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductComponentsPage, ProductDeleteDialog, ProductUpdatePage } from './product.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Product e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productComponentsPage: ProductComponentsPage;
  let productUpdatePage: ProductUpdatePage;
  let productDeleteDialog: ProductDeleteDialog;
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

  it('should load Products', async () => {
    await navBarPage.goToEntity('product');
    productComponentsPage = new ProductComponentsPage();
    await browser.wait(ec.visibilityOf(productComponentsPage.title), 5000);
    expect(await productComponentsPage.getTitle()).to.eq('lacusticoApp.product.home.title');
    await browser.wait(ec.or(ec.visibilityOf(productComponentsPage.entities), ec.visibilityOf(productComponentsPage.noResult)), 1000);
  });

  it('should load create Product page', async () => {
    await productComponentsPage.clickOnCreateButton();
    productUpdatePage = new ProductUpdatePage();
    expect(await productUpdatePage.getPageTitle()).to.eq('lacusticoApp.product.home.createOrEditLabel');
    await productUpdatePage.cancel();
  });

  it('should create and save Products', async () => {
    const nbButtonsBeforeCreate = await productComponentsPage.countDeleteButtons();

    await productComponentsPage.clickOnCreateButton();

    await promise.all([
      productUpdatePage.setNameInput('name'),
      productUpdatePage.setDescriptionInput('description'),
      productUpdatePage.setPriceInput('5'),
      productUpdatePage.setProductImageInput(absolutePath),
      productUpdatePage.categorySelectLastOption(),
      productUpdatePage.entrepreneurSelectLastOption(),
    ]);

    expect(await productUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await productUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await productUpdatePage.getPriceInput()).to.eq('5', 'Expected price value to be equals to 5');
    expect(await productUpdatePage.getProductImageInput()).to.endsWith(
      fileNameToUpload,
      'Expected ProductImage value to be end with ' + fileNameToUpload
    );
    const selectedActivated = productUpdatePage.getActivatedInput();
    if (await selectedActivated.isSelected()) {
      await productUpdatePage.getActivatedInput().click();
      expect(await productUpdatePage.getActivatedInput().isSelected(), 'Expected activated not to be selected').to.be.false;
    } else {
      await productUpdatePage.getActivatedInput().click();
      expect(await productUpdatePage.getActivatedInput().isSelected(), 'Expected activated to be selected').to.be.true;
    }

    await productUpdatePage.save();
    expect(await productUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await productComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Product', async () => {
    const nbButtonsBeforeDelete = await productComponentsPage.countDeleteButtons();
    await productComponentsPage.clickOnLastDeleteButton();

    productDeleteDialog = new ProductDeleteDialog();
    expect(await productDeleteDialog.getDialogTitle()).to.eq('lacusticoApp.product.delete.question');
    await productDeleteDialog.clickOnConfirmButton();

    expect(await productComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
