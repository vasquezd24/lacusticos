import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';
import { IDeliveryPlatform } from 'app/shared/model/delivery-platform.model';
import { DeliveryPlatformService } from 'app/entities/delivery-platform/delivery-platform.service';
import { HttpResponse } from '@angular/common/http';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';

@Component({
  selector: 'jhi-entrepreneur-detail',
  templateUrl: './entrepreneur-detail.component.html',
})
export class EntrepreneurDetailComponent implements OnInit {
  entrepreneur: IEntrepreneur | null = null;
  deliveryPlatforms?: IDeliveryPlatform[];
  products?: IProduct[];
  //         ^ note the exclamation mark here
  pageSize = 12;
  page = 1;
  collectionSize = 0;

  constructor(
    protected dataUtils: JhiDataUtils,
    protected activatedRoute: ActivatedRoute,
    protected deliveryPlatformService: DeliveryPlatformService,
    protected productService: ProductService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entrepreneur }) => (this.entrepreneur = entrepreneur));
    this.loadDeliveryPlatform();
    this.loadProducts();
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }

  loadDeliveryPlatform(): void {
    this.deliveryPlatformService
      .findByEntrepreneur(this.entrepreneur?.id)
      .subscribe((res: HttpResponse<IDeliveryPlatform[]>) => (this.deliveryPlatforms = res.body || []));
  }

  loadProducts(): void {
    this.productService
      .findByEntrepreneur(this.entrepreneur?.id)
      .subscribe(
        (res: HttpResponse<IProduct[]>) => ((this.products = res.body || []), (this.collectionSize = Number(this.products?.length)))
      );
  }

  trackId(index: number, item: IDeliveryPlatform): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }
}
