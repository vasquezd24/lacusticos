import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LacusticoSharedModule } from 'app/shared/shared.module';
import { SubscriptorComponent } from './subscriptor.component';
import { SubscriptorDetailComponent } from './subscriptor-detail.component';
import { SubscriptorUpdateComponent } from './subscriptor-update.component';
import { SubscriptorDeleteDialogComponent } from './subscriptor-delete-dialog.component';
import { subscriptorRoute } from './subscriptor.route';

@NgModule({
  imports: [LacusticoSharedModule, RouterModule.forChild(subscriptorRoute)],
  declarations: [SubscriptorComponent, SubscriptorDetailComponent, SubscriptorUpdateComponent, SubscriptorDeleteDialogComponent],
  entryComponents: [SubscriptorDeleteDialogComponent],
})
export class LacusticoSubscriptorModule {}
