import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeliveryPlatform } from 'app/shared/model/delivery-platform.model';

@Component({
  selector: 'jhi-delivery-platform-detail',
  templateUrl: './delivery-platform-detail.component.html',
})
export class DeliveryPlatformDetailComponent implements OnInit {
  deliveryPlatform: IDeliveryPlatform | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryPlatform }) => (this.deliveryPlatform = deliveryPlatform));
  }

  previousState(): void {
    window.history.back();
  }
}
