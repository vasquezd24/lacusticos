import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';
import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';
import { IDeliveryPlatform } from 'app/shared/model/delivery-platform.model';
import { DeliveryPlatformService } from 'app/entities/delivery-platform/delivery-platform.service';
import { HttpResponse } from '@angular/common/http';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';
import { SubscriptorService } from 'app/entities/subscriptor/subscriptor.service';
import { ISubscriptor } from 'app/shared/model/subscriptor.model';
import { LocationService } from 'app/entities/location/location.service';
import { ILocation } from 'app/shared/model/location.model';
import { AccountService } from 'app/core/auth/account.service';
import { SubscribersAddComponent } from 'app/entities/entrepreneur/subscribers.add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-entrepreneur-detail',
  templateUrl: './entrepreneur-detail.component.html',
})
export class EntrepreneurDetailComponent implements OnInit {
  entrepreneur: IEntrepreneur | null = null;
  deliveryPlatforms?: IDeliveryPlatform[];
  products?: IProduct[] | undefined;
  subscriptors?: ISubscriptor[];
  locations?: ILocation[];
  pageSize = 12;
  page = 1;
  collectionSize = 0;
  subscribers = 0;
  latitude = 9.9333;
  longitude = -84.0833;

  constructor(
    protected dataUtils: JhiDataUtils,
    protected activatedRoute: ActivatedRoute,
    protected deliveryPlatformService: DeliveryPlatformService,
    protected productService: ProductService,
    protected subscriptorService: SubscriptorService,
    protected locationService: LocationService,
    private accountService: AccountService,
    private modalService: NgbModal
  ) {}

  onChoseLocation($event: { coords: { lat: any; lng: any } }): void {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entrepreneur }) => (this.entrepreneur = entrepreneur));
    this.loadDeliveryPlatform();
    this.loadProducts();
    this.loadSubscriptions();
    this.loadLocations();
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

  loadSubscriptions(): void {
    this.subscriptorService
      .findByEntrepreneur(this.entrepreneur?.id)
      .subscribe(
        (res: HttpResponse<ISubscriptor[]>) => ((this.subscriptors = res.body || []), (this.subscribers = this.subscriptors.length))
      );
  }

  loadLocations(): void {
    this.locationService
      .findActiveLocationByEntrepreneur(this.entrepreneur?.id)
      .subscribe((res: HttpResponse<ILocation[]>) => (this.locations = res.body || []));
  }

  trackId(index: number, item: IDeliveryPlatform): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  convertToNumber(param: number | undefined): number {
    const numb: number = Number(param) + 0;
    return numb;
  }

  // onChoseLocation($event: { coords: { lat: any; lng: any; }; }): void{

  findProductByName(event: KeyboardEvent): void {
    const name = (event.target as HTMLInputElement).value;
    /* eslint-disable no-console */
    this.productService
      .findByNameByEntrepreneur(this.entrepreneur?.id, name)
      .subscribe(
        (res: HttpResponse<IProduct[]>) => ((this.products = res.body || []), (this.collectionSize = Number(this.products?.length)))
      );
  }

  openSubscribeModal(entrepreneur: IEntrepreneur): void {
    const modalRef = this.modalService.open(SubscribersAddComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.entrepreneur = entrepreneur;
  }
}
