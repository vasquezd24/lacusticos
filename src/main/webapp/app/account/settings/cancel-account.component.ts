import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './cancel-account.component.html',
})
export class CancelAccountComponent {
  account?: Account;

  constructor(
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    private router: Router,
    private loginService: LoginService
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(acco: Account): void {
    // this.userService.update({...acco,activated:false}).subscribe();
    this.accountService.save({ ...acco, activated: false }).subscribe(() => {
      this.activeModal.close();
      this.loginService.logout();
      this.router.navigate(['']);
    });
    //  this.loginService.logout();
    // this.router.navigate(['']);
  }
}
