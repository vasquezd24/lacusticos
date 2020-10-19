import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDeliveryPlatform } from 'app/shared/model/delivery-platform.model';
import { DeliveryPlatformService } from './delivery-platform.service';
import { DeliveryPlatformDeleteDialogComponent } from './delivery-platform-delete-dialog.component';

@Component({
  selector: 'jhi-delivery-platform',
  templateUrl: './delivery-platform.component.html',
})
export class DeliveryPlatformComponent implements OnInit, OnDestroy {
  deliveryPlatforms?: IDeliveryPlatform[];
  eventSubscriber?: Subscription;

  constructor(
    protected deliveryPlatformService: DeliveryPlatformService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.deliveryPlatformService.query().subscribe((res: HttpResponse<IDeliveryPlatform[]>) => (this.deliveryPlatforms = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDeliveryPlatforms();
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
