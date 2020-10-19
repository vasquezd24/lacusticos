import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISubscriptor, Subscriptor } from 'app/shared/model/subscriptor.model';
import { SubscriptorService } from './subscriptor.service';
import { SubscriptorComponent } from './subscriptor.component';
import { SubscriptorDetailComponent } from './subscriptor-detail.component';
import { SubscriptorUpdateComponent } from './subscriptor-update.component';

@Injectable({ providedIn: 'root' })
export class SubscriptorResolve implements Resolve<ISubscriptor> {
  constructor(private service: SubscriptorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubscriptor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((subscriptor: HttpResponse<Subscriptor>) => {
          if (subscriptor.body) {
            return of(subscriptor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Subscriptor());
  }
}

export const subscriptorRoute: Routes = [
  {
    path: '',
    component: SubscriptorComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'lacusticoApp.subscriptor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SubscriptorDetailComponent,
    resolve: {
      subscriptor: SubscriptorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'lacusticoApp.subscriptor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SubscriptorUpdateComponent,
    resolve: {
      subscriptor: SubscriptorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'lacusticoApp.subscriptor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SubscriptorUpdateComponent,
    resolve: {
      subscriptor: SubscriptorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'lacusticoApp.subscriptor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
