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
  latitude = 9.9333;
  longitude = -84.0833;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    details: [null, [Validators.required]],
    activated: [null, [Validators.required]],
    entrepreneur: [null, [Validators.required]],
  });

  constructor(
    protected locationService: LocationService,
    protected entrepreneurService: EntrepreneurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  onChoseLocation($event: { coords: { lat: any; lng: any } }): void {
    /* eslint-disable no-console */

    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    /* eslint-disable no-console */
    console.log(this.latitude, ' + ', this.longitude);
  }

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
      details: location.details,
      activated: location.activated,
      entrepreneur: location.entrepreneur,
    });
    if (location.latitude != null) {
      this.latitude = Number(location.latitude);
    }
    if (location.longitude != null) {
      this.longitude = Number(location.longitude);
    }
  }

  convertToNumber(param: number | undefined): number {
    const numb: number = Number(param) + 0;
    return numb;
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const location = this.createFromForm();
    location.latitude = this.latitude;
    location.longitude = this.longitude;

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
      details: this.editForm.get(['details'])!.value,
      activated: this.editForm.get(['activated'])!.value,
      entrepreneur: this.editForm.get(['entrepreneur'])!.value,
      latitude: this.latitude,
      longitude: this.longitude,
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
