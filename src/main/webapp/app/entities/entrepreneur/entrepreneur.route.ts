import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEntrepreneur, Entrepreneur } from 'app/shared/model/entrepreneur.model';
import { EntrepreneurService } from './entrepreneur.service';
import { EntrepreneurComponent } from './entrepreneur.component';
import { EntrepreneurDetailComponent } from './entrepreneur-detail.component';
import { EntrepreneurUpdateComponent } from './entrepreneur-update.component';
import { ProductComponent } from 'app/entities/product/product.component';
import { ProductDetailComponent } from 'app/entities/product/product-detail.component';
import { ProductResolve } from 'app/entities/product/product.route';
import { DeliveryPlatformComponent } from 'app/entities/delivery-platform/delivery-platform.component';
import { LocationComponent } from 'app/entities/location/location.component';

@Injectable({ providedIn: 'root' })
export class EntrepreneurResolve implements Resolve<IEntrepreneur> {
  constructor(private service: EntrepreneurService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntrepreneur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((entrepreneur: HttpResponse<Entrepreneur>) => {
          if (entrepreneur.body) {
            return of(entrepreneur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Entrepreneur());
  }
}

export const entrepreneurRoute: Routes = [
  {
    path: '',
    component: EntrepreneurComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'lacusticoApp.entrepreneur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntrepreneurDetailComponent,
    resolve: {
      entrepreneur: EntrepreneurResolve,
    },
    data: {
      authorities: [],
      pageTitle: 'lacusticoApp.entrepreneur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntrepreneurUpdateComponent,
    resolve: {
      entrepreneur: EntrepreneurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'lacusticoApp.entrepreneur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntrepreneurUpdateComponent,
    resolve: {
      entrepreneur: EntrepreneurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'lacusticoApp.entrepreneur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    resolve: {
      entrepreneur: EntrepreneurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'lacusticoApp.entrepreneur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductDetailComponent,
    resolve: {
      product: ProductResolve,
    },
    data: {
      authorities: [],
      pageTitle: 'lacusticoApp.product.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'delivery-platform/:id',
    component: DeliveryPlatformComponent,
    resolve: {
      product: EntrepreneurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'lacusticoApp.deliveryPlatform.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'location/:id',
    component: LocationComponent,
    resolve: {
      product: EntrepreneurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'lacusticoApp.location.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
