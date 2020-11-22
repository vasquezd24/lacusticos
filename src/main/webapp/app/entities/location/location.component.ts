import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from './location.service';
import { LocationDeleteDialogComponent } from './location-delete-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-location',
  templateUrl: './location.component.html',
})
export class LocationComponent implements OnInit, OnDestroy {
  locations?: ILocation[];
  eventSubscriber?: Subscription;
  pageSize = 10;
  page = 1;
  collectionSize = 0;

  constructor(
    protected locationService: LocationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {}

  loadAll(): void {
    const id: string[] = this.activatedRoute.snapshot.paramMap.getAll('id');

    if (this.activatedRoute.snapshot.paramMap.getAll('id').length !== 0) {
      this.locationService
        .findByEntrepreneur(Number(id))
        .subscribe(
          (res: HttpResponse<ILocation[]>) => ((this.locations = res.body || []), (this.collectionSize = Number(this.locations?.length)))
        );
    } else {
      this.locationService
        .query()
        .subscribe(
          (res: HttpResponse<ILocation[]>) => ((this.locations = res.body || []), (this.collectionSize = Number(this.locations.length)))
        );
    }
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocation): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLocations(): void {
    this.eventSubscriber = this.eventManager.subscribe('locationListModification', () => this.loadAll());
  }

  delete(location: ILocation): void {
    const modalRef = this.modalService.open(LocationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.location = location;
  }

  setActive(locations: ILocation, isActivated: boolean): void {
    this.locationService.update({ ...locations, activated: isActivated }).subscribe(() => this.loadAll());
  }

  previousState(): void {
    window.history.back();
  }
}
