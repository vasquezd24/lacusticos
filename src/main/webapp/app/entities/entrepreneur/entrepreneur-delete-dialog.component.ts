import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';
import { EntrepreneurService } from './entrepreneur.service';

@Component({
  templateUrl: './entrepreneur-delete-dialog.component.html',
})
export class EntrepreneurDeleteDialogComponent {
  entrepreneur?: IEntrepreneur;

  constructor(
    protected entrepreneurService: EntrepreneurService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.entrepreneurService.delete(id).subscribe(() => {
      this.eventManager.broadcast('entrepreneurListModification');
      this.activeModal.close();
    });
  }
}
