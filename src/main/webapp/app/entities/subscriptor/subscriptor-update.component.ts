import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISubscriptor, Subscriptor } from 'app/shared/model/subscriptor.model';
import { SubscriptorService } from './subscriptor.service';
import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';
import { EntrepreneurService } from 'app/entities/entrepreneur/entrepreneur.service';

@Component({
  selector: 'jhi-subscriptor-update',
  templateUrl: './subscriptor-update.component.html',
})
export class SubscriptorUpdateComponent implements OnInit {
  isSaving = false;
  entrepreneurs: IEntrepreneur[] = [];

  editForm = this.fb.group({
    id: [],
    email: [null, [Validators.required]],
    activated: [null, [Validators.required]],
    entrepreneur: [],
  });

  constructor(
    protected subscriptorService: SubscriptorService,
    protected entrepreneurService: EntrepreneurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subscriptor }) => {
      this.updateForm(subscriptor);

      this.entrepreneurService.query().subscribe((res: HttpResponse<IEntrepreneur[]>) => (this.entrepreneurs = res.body || []));
    });
  }

  updateForm(subscriptor: ISubscriptor): void {
    this.editForm.patchValue({
      id: subscriptor.id,
      email: subscriptor.email,
      activated: subscriptor.activated,
      entrepreneur: subscriptor.entrepreneur,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subscriptor = this.createFromForm();
    if (subscriptor.id !== undefined) {
      this.subscribeToSaveResponse(this.subscriptorService.update(subscriptor));
    } else {
      this.subscribeToSaveResponse(this.subscriptorService.create(subscriptor));
    }
  }

  private createFromForm(): ISubscriptor {
    return {
      ...new Subscriptor(),
      id: this.editForm.get(['id'])!.value,
      email: this.editForm.get(['email'])!.value,
      activated: this.editForm.get(['activated'])!.value,
      entrepreneur: this.editForm.get(['entrepreneur'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubscriptor>>): void {
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
