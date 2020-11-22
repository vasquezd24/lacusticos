import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LacusticoSharedModule } from 'app/shared/shared.module';
import { EntrepreneurComponent } from './entrepreneur.component';
import { EntrepreneurDetailComponent } from './entrepreneur-detail.component';
import { EntrepreneurUpdateComponent } from './entrepreneur-update.component';
import { EntrepreneurDeleteDialogComponent } from './entrepreneur-delete-dialog.component';
import { entrepreneurRoute } from './entrepreneur.route';

import { AgmCoreModule } from '@agm/core';
import { SubscribersAddComponent } from 'app/entities/entrepreneur/subscribers.add.component';

@NgModule({
  imports: [
    LacusticoSharedModule,
    RouterModule.forChild(entrepreneurRoute),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDmNfa5XLklQJ_EhNvuS4zEmQzJZOeqrZg',
    }),
  ],

  declarations: [
    EntrepreneurComponent,
    EntrepreneurDetailComponent,
    EntrepreneurUpdateComponent,
    EntrepreneurDeleteDialogComponent,
    SubscribersAddComponent,
  ],
  entryComponents: [EntrepreneurDeleteDialogComponent],
})
export class LacusticoEntrepreneurModule {}
