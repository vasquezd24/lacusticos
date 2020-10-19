import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubscriptor } from 'app/shared/model/subscriptor.model';
import { SubscriptorService } from './subscriptor.service';

@Component({
  templateUrl: './subscriptor-delete-dialog.component.html',
})
export class SubscriptorDeleteDialogComponent {
  subscriptor?: ISubscriptor;

  constructor(
    protected subscriptorService: SubscriptorService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.subscriptorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('subscriptorListModification');
      this.activeModal.close();
    });
  }
}
