import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { ProductDeleteDialogComponent } from './product-delete-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'app/shared/model/category.model';

@Component({
  selector: 'jhi-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit, OnDestroy {
  products?: IProduct[];
  eventSubscriber?: Subscription;
  pageSize = 10;
  page = 1;
  collectionSize = 0;

  constructor(
    protected productService: ProductService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {}

  loadAll(): void {
    const id: string[] = this.activatedRoute.snapshot.paramMap.getAll('id');

    if (this.activatedRoute.snapshot.paramMap.getAll('id').length !== 0) {
      this.productService
        .findByEntrepreneurAll(Number(id))
        .subscribe(
          (res: HttpResponse<IProduct[]>) => ((this.products = res.body || []), (this.collectionSize = Number(this.products?.length)))
        );
    } else {
      this.productService
        .query()
        .subscribe(
          (res: HttpResponse<IProduct[]>) => ((this.products = res.body || []), (this.collectionSize = Number(this.products?.length)))
        );
    }
  }
  previousState(): void {
    window.history.back();
  }
  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProducts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProduct): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInProducts(): void {
    this.eventSubscriber = this.eventManager.subscribe('productListModification', () => this.loadAll());
  }

  delete(product: IProduct): void {
    const modalRef = this.modalService.open(ProductDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.product = product;
  }

  setActive(category: ICategory, isActivated: boolean): void {
    this.productService.update({ ...category, activated: isActivated }).subscribe(() => this.loadAll());
  }
}
