import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubscriptor } from 'app/shared/model/subscriptor.model';
import { SubscriptorService } from './subscriptor.service';
import { SubscriptorDeleteDialogComponent } from './subscriptor-delete-dialog.component';

@Component({
  selector: 'jhi-subscriptor',
  templateUrl: './subscriptor.component.html',
})
export class SubscriptorComponent implements OnInit, OnDestroy {
  subscriptors?: ISubscriptor[];
  eventSubscriber?: Subscription;

  constructor(
    protected subscriptorService: SubscriptorService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.subscriptorService.query().subscribe((res: HttpResponse<ISubscriptor[]>) => (this.subscriptors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSubscriptors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISubscriptor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSubscriptors(): void {
    this.eventSubscriber = this.eventManager.subscribe('subscriptorListModification', () => this.loadAll());
  }

  delete(subscriptor: ISubscriptor): void {
    const modalRef = this.modalService.open(SubscriptorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subscriptor = subscriptor;
  }
}
