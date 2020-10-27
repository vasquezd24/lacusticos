import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from './category.service';
import { CategoryDeleteDialogComponent } from './category-delete-dialog.component';

@Component({
  selector: 'jhi-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories?: ICategory[];
  eventSubscriber?: Subscription;
  pageSize = 10;
  page = 1;
  collectionSize = 0;

  constructor(protected categoryService: CategoryService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.categoryService
      .query()
      .subscribe(
        (res: HttpResponse<ICategory[]>) => ((this.categories = res.body || []), (this.collectionSize = Number(this.categories.length)))
      );
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCategories();
  }
  previousState(): void {
    window.history.back();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICategory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('categoryListModification', () => this.loadAll());
  }

  delete(category: ICategory): void {
    const modalRef = this.modalService.open(CategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.category = category;
  }

  setActive(category: ICategory, isActivated: boolean): void {
    this.categoryService.update({ ...category, activated: isActivated }).subscribe(() => this.loadAll());
  }
}
