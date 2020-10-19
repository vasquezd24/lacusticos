import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeliveryPlatform } from 'app/shared/model/delivery-platform.model';
import { DeliveryPlatformService } from './delivery-platform.service';

@Component({
  templateUrl: './delivery-platform-delete-dialog.component.html',
})
export class DeliveryPlatformDeleteDialogComponent {
  deliveryPlatform?: IDeliveryPlatform;

  constructor(
    protected deliveryPlatformService: DeliveryPlatformService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.deliveryPlatformService.delete(id).subscribe(() => {
      this.eventManager.broadcast('deliveryPlatformListModification');
      this.activeModal.close();
    });
  }
}
