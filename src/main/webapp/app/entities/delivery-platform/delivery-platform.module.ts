import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LacusticoSharedModule } from 'app/shared/shared.module';
import { DeliveryPlatformComponent } from './delivery-platform.component';
import { DeliveryPlatformDetailComponent } from './delivery-platform-detail.component';
import { DeliveryPlatformUpdateComponent } from './delivery-platform-update.component';
import { DeliveryPlatformDeleteDialogComponent } from './delivery-platform-delete-dialog.component';
import { deliveryPlatformRoute } from './delivery-platform.route';

@NgModule({
  imports: [LacusticoSharedModule, RouterModule.forChild(deliveryPlatformRoute)],
  declarations: [
    DeliveryPlatformComponent,
    DeliveryPlatformDetailComponent,
    DeliveryPlatformUpdateComponent,
    DeliveryPlatformDeleteDialogComponent,
  ],
  entryComponents: [DeliveryPlatformDeleteDialogComponent],
})
export class LacusticoDeliveryPlatformModule {}
