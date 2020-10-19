import { element, by, ElementFinder } from 'protractor';

export class DeliveryPlatformComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-delivery-platform div table .btn-danger'));
  title = element.all(by.css('jhi-delivery-platform div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class DeliveryPlatformUpdatePage {
  pageTitle = element(by.id('jhi-delivery-platform-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));

  entrepreneurSelect = element(by.id('field_entrepreneur'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async entrepreneurSelectLastOption(): Promise<void> {
    await this.entrepreneurSelect.all(by.tagName('option')).last().click();
  }

  async entrepreneurSelectOption(option: string): Promise<void> {
    await this.entrepreneurSelect.sendKeys(option);
  }

  getEntrepreneurSelect(): ElementFinder {
    return this.entrepreneurSelect;
  }

  async getEntrepreneurSelectedOption(): Promise<string> {
    return await this.entrepreneurSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class DeliveryPlatformDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-deliveryPlatform-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-deliveryPlatform'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
