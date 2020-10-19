import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDeliveryPlatform, DeliveryPlatform } from 'app/shared/model/delivery-platform.model';
import { DeliveryPlatformService } from './delivery-platform.service';
import { DeliveryPlatformComponent } from './delivery-platform.component';
import { DeliveryPlatformDetailComponent } from './delivery-platform-detail.component';
import { DeliveryPlatformUpdateComponent } from './delivery-platform-update.component';

@Injectable({ providedIn: 'root' })
export class DeliveryPlatformResolve implements Resolve<IDeliveryPlatform> {
  constructor(private service: DeliveryPlatformService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDeliveryPlatform> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((deliveryPlatform: HttpResponse<DeliveryPlatform>) => {
          if (deliveryPlatform.body) {
            return of(deliveryPlatform.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DeliveryPlatform());
  }
}

export const deliveryPlatformRoute: Routes = [
  {
    path: '',
    component: DeliveryPlatformComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'lacusticoApp.deliveryPlatform.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeliveryPlatformDetailComponent,
    resolve: {
      deliveryPlatform: DeliveryPlatformResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'lacusticoApp.deliveryPlatform.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeliveryPlatformUpdateComponent,
    resolve: {
      deliveryPlatform: DeliveryPlatformResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'lacusticoApp.deliveryPlatform.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeliveryPlatformUpdateComponent,
    resolve: {
      deliveryPlatform: DeliveryPlatformResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'lacusticoApp.deliveryPlatform.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
