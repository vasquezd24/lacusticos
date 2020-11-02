import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDeliveryPlatform } from 'app/shared/model/delivery-platform.model';
import { DeliveryPlatformService } from './delivery-platform.service';
import { DeliveryPlatformDeleteDialogComponent } from './delivery-platform-delete-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-delivery-platform',
  templateUrl: './delivery-platform.component.html',
})
export class DeliveryPlatformComponent implements OnInit, OnDestroy {
  deliveryPlatforms?: IDeliveryPlatform[];
  eventSubscriber?: Subscription;
  collectionSize = 0;

  constructor(
    protected deliveryPlatformService: DeliveryPlatformService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {}

  loadAll(): void {
    const id: string[] = this.activatedRoute.snapshot.paramMap.getAll('id');

    if (this.activatedRoute.snapshot.paramMap.getAll('id').length !== 0) {
      this.deliveryPlatformService
        .findByEntrepreneur(Number(id))
        .subscribe(
          (res: HttpResponse<IDeliveryPlatform[]>) => (
            (this.deliveryPlatforms = res.body || []), (this.collectionSize = Number(this.deliveryPlatforms?.length))
          )
        );
    } else {
      this.deliveryPlatformService.query().subscribe((res: HttpResponse<IDeliveryPlatform[]>) => (this.deliveryPlatforms = res.body || []));
    }
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDeliveryPlatforms();
  }

  previousState(): void {
    window.history.back();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDeliveryPlatform): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDeliveryPlatforms(): void {
    this.eventSubscriber = this.eventManager.subscribe('deliveryPlatformListModification', () => this.loadAll());
  }

  delete(deliveryPlatform: IDeliveryPlatform): void {
    const modalRef = this.modalService.open(DeliveryPlatformDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.deliveryPlatform = deliveryPlatform;
  }
}
