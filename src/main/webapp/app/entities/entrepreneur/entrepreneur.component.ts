import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';
import { EntrepreneurService } from './entrepreneur.service';
import { EntrepreneurDeleteDialogComponent } from './entrepreneur-delete-dialog.component';

@Component({
  selector: 'jhi-entrepreneur',
  templateUrl: './entrepreneur.component.html',
})
export class EntrepreneurComponent implements OnInit, OnDestroy {
  entrepreneurs?: IEntrepreneur[];
  eventSubscriber?: Subscription;

  constructor(
    protected entrepreneurService: EntrepreneurService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.entrepreneurService.query().subscribe((res: HttpResponse<IEntrepreneur[]>) => (this.entrepreneurs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEntrepreneurs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEntrepreneur): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInEntrepreneurs(): void {
    this.eventSubscriber = this.eventManager.subscribe('entrepreneurListModification', () => this.loadAll());
  }

  delete(entrepreneur: IEntrepreneur): void {
    const modalRef = this.modalService.open(EntrepreneurDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.entrepreneur = entrepreneur;
  }
  setActive(entrepreneurs: IEntrepreneur, isActivated: boolean): void {
    this.entrepreneurService.update({ ...entrepreneurs, activated: isActivated }).subscribe(() => this.loadAll());
  }
}
