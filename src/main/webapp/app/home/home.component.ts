import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { HttpResponse } from '@angular/common/http';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';
import { EntrepreneurService } from 'app/entities/entrepreneur/entrepreneur.service';
import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  products?: IProduct[];
  entrepreneurs?: IEntrepreneur[];
  typeSearch = false; // false= products, true=entrepreneur
  filterSearch = false; // false= name, true=category

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private productService: ProductService,
    private entrepreneurService: EntrepreneurService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.loadAllActiveProducts();
    this.loadAllActiveEntrepreneur();
  }

  updateTypeSearch(bool: boolean): void {
    this.typeSearch = bool;
  }
  updateFilterSearch(bool: boolean): void {
    this.filterSearch = bool;
  }
  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  trackId(index: number, item: IEntrepreneur | IProduct): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  // Products
  loadAllActiveProducts(): void {
    this.productService.findAllActive().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
  }

  findProductByName(name: string): void {
    this.productService.findAllActiveByName(name).subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
  }

  findProductByCategory(category: string): void {
    this.productService.findAllActiveByCategory(category).subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
  }

  //  Entrepreneur
  findEntrepreneurByName(name: string): void {
    this.entrepreneurService
      .findAllActiveByName(name)
      .subscribe((res: HttpResponse<IEntrepreneur[]>) => (this.entrepreneurs = res.body || []));
  }

  loadAllActiveEntrepreneur(): void {
    this.entrepreneurService.findAllActive().subscribe((res: HttpResponse<IEntrepreneur[]>) => (this.entrepreneurs = res.body || []));
  }

  findEntrepreneurByCategory(category: string): void {
    this.entrepreneurService
      .findAllActiveByCategory(category)
      .subscribe((res: HttpResponse<IEntrepreneur[]>) => (this.entrepreneurs = res.body || []));
  }

  //  Both
  find(event: KeyboardEvent): void {
    // (<HTMLInputElement>event.target)
    // const criteria = event.target!.value;

    const criteria = (event.target as HTMLInputElement).value;
    if (criteria !== '') {
      // si criteria es valido
      if (this.typeSearch === false) {
        // si es emprendedor o producto

        if (this.filterSearch === false) {
          this.findProductByName(criteria);
        } else {
          this.findProductByCategory(criteria);
        }
      } else {
        if (this.filterSearch === false) {
          this.findEntrepreneurByName(criteria);
        } else {
          this.findEntrepreneurByCategory(criteria);
        }
      }
    } else {
      this.loadAllActiveEntrepreneur();
      this.loadAllActiveProducts();
    }
  }
}
