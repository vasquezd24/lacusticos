import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILocation, Location } from 'app/shared/model/location.model';
import { LocationService } from './location.service';
import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';
import { EntrepreneurService } from 'app/entities/entrepreneur/entrepreneur.service';

@Component({
  selector: 'jhi-location-update',
  templateUrl: './location-update.component.html',
})
export class LocationUpdateComponent implements OnInit {
  isSaving = false;
  entrepreneurs: IEntrepreneur[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    latitude: [null, [Validators.required]],
    longitude: [null, [Validators.required]],
    details: [null, [Validators.required]],
    activated: [null, [Validators.required]],
    entrepreneur: [],
  });

  constructor(
    protected locationService: LocationService,
    protected entrepreneurService: EntrepreneurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ location }) => {
      this.updateForm(location);

      this.entrepreneurService.query().subscribe((res: HttpResponse<IEntrepreneur[]>) => (this.entrepreneurs = res.body || []));
    });
  }

  updateForm(location: ILocation): void {
    this.editForm.patchValue({
      id: location.id,
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      details: location.details,
      activated: location.activated,
      entrepreneur: location.entrepreneur,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const location = this.createFromForm();
    if (location.id !== undefined) {
      this.subscribeToSaveResponse(this.locationService.update(location));
    } else {
      this.subscribeToSaveResponse(this.locationService.create(location));
    }
  }

  private createFromForm(): ILocation {
    return {
      ...new Location(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      details: this.editForm.get(['details'])!.value,
      activated: this.editForm.get(['activated'])!.value,
      entrepreneur: this.editForm.get(['entrepreneur'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocation>>): void {
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
