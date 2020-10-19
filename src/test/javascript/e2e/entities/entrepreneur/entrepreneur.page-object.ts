import { element, by, ElementFinder } from 'protractor';

export class EntrepreneurComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-entrepreneur div table .btn-danger'));
  title = element.all(by.css('jhi-entrepreneur div h2#page-heading span')).first();
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

export class EntrepreneurUpdatePage {
  pageTitle = element(by.id('jhi-entrepreneur-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  emailInput = element(by.id('field_email'));
  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));
  phoneNumberInput = element(by.id('field_phoneNumber'));
  scheduleInput = element(by.id('field_schedule'));
  pictureInput = element(by.id('file_picture'));
  webSiteInput = element(by.id('field_webSite'));
  facebookPageInput = element(by.id('field_facebookPage'));
  instagramPageInput = element(by.id('field_instagramPage'));
  activatedInput = element(by.id('field_activated'));

  categorySelect = element(by.id('field_category'));
  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber: string): Promise<void> {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput(): Promise<string> {
    return await this.phoneNumberInput.getAttribute('value');
  }

  async setScheduleInput(schedule: string): Promise<void> {
    await this.scheduleInput.sendKeys(schedule);
  }

  async getScheduleInput(): Promise<string> {
    return await this.scheduleInput.getAttribute('value');
  }

  async setPictureInput(picture: string): Promise<void> {
    await this.pictureInput.sendKeys(picture);
  }

  async getPictureInput(): Promise<string> {
    return await this.pictureInput.getAttribute('value');
  }

  async setWebSiteInput(webSite: string): Promise<void> {
    await this.webSiteInput.sendKeys(webSite);
  }

  async getWebSiteInput(): Promise<string> {
    return await this.webSiteInput.getAttribute('value');
  }

  async setFacebookPageInput(facebookPage: string): Promise<void> {
    await this.facebookPageInput.sendKeys(facebookPage);
  }

  async getFacebookPageInput(): Promise<string> {
    return await this.facebookPageInput.getAttribute('value');
  }

  async setInstagramPageInput(instagramPage: string): Promise<void> {
    await this.instagramPageInput.sendKeys(instagramPage);
  }

  async getInstagramPageInput(): Promise<string> {
    return await this.instagramPageInput.getAttribute('value');
  }

  getActivatedInput(): ElementFinder {
    return this.activatedInput;
  }

  async categorySelectLastOption(): Promise<void> {
    await this.categorySelect.all(by.tagName('option')).last().click();
  }

  async categorySelectOption(option: string): Promise<void> {
    await this.categorySelect.sendKeys(option);
  }

  getCategorySelect(): ElementFinder {
    return this.categorySelect;
  }

  async getCategorySelectedOption(): Promise<string> {
    return await this.categorySelect.element(by.css('option:checked')).getText();
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class EntrepreneurDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-entrepreneur-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-entrepreneur'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
