import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';
import { SubscriptorService } from 'app/entities/subscriptor/subscriptor.service';
import { ISubscriptor, Subscriptor } from 'app/shared/model/subscriptor.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IProduct } from 'app/shared/model/product.model';

@Component({
  selector: 'jhi-subscriber-add',
  templateUrl: './subscribers.add.component.html',
})
export class SubscribersAddComponent {
  entrepreneur?: IEntrepreneur;
  subscriptors?: IProduct[];
  subscribeForm = this.fb.group({
    email: [null, [Validators.required]],
  });
  isSaving = false;

  constructor(
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager,
    protected subscriptorService: SubscriptorService,
    private fb: FormBuilder
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  private createSubscriber(): ISubscriptor {
    return {
      ...new Subscriptor(),
      email: this.subscribeForm.get(['email'])!.value,
      entrepreneur: this.entrepreneur,
      activated: true,
    };
  }

  subscribe(): void {
    this.isSaving = true;
    const subscriber = this.createSubscriber();
    this.subscribeToSaveResponse(this.subscriptorService.create(subscriber));
    this.cancel();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubscriptor>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.cancel();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
