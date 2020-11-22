import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDeliveryPlatform, DeliveryPlatform } from 'app/shared/model/delivery-platform.model';
import { DeliveryPlatformService } from './delivery-platform.service';
import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';
import { EntrepreneurService } from 'app/entities/entrepreneur/entrepreneur.service';

@Component({
  selector: 'jhi-delivery-platform-update',
  templateUrl: './delivery-platform-update.component.html',
})
export class DeliveryPlatformUpdateComponent implements OnInit {
  isSaving = false;
  entrepreneurs: IEntrepreneur[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    entrepreneur: [null, [Validators.required]],
  });

  constructor(
    protected deliveryPlatformService: DeliveryPlatformService,
    protected entrepreneurService: EntrepreneurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryPlatform }) => {
      this.updateForm(deliveryPlatform);

      this.entrepreneurService.findByCurrentUser().subscribe((res: HttpResponse<IEntrepreneur[]>) => (this.entrepreneurs = res.body || []));
    });
  }

  updateForm(deliveryPlatform: IDeliveryPlatform): void {
    this.editForm.patchValue({
      id: deliveryPlatform.id,
      name: deliveryPlatform.name,
      entrepreneur: deliveryPlatform.entrepreneur,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const deliveryPlatform = this.createFromForm();
    if (deliveryPlatform.id !== undefined) {
      this.subscribeToSaveResponse(this.deliveryPlatformService.update(deliveryPlatform));
    } else {
      this.subscribeToSaveResponse(this.deliveryPlatformService.create(deliveryPlatform));
    }
  }

  private createFromForm(): IDeliveryPlatform {
    return {
      ...new DeliveryPlatform(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      entrepreneur: this.editForm.get(['entrepreneur'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryPlatform>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IEntrepreneur): any {
    return item.id;
  }
}
