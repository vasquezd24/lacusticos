import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LacusticoSharedModule } from 'app/shared/shared.module';
import { LocationComponent } from './location.component';
import { LocationDetailComponent } from './location-detail.component';
import { LocationUpdateComponent } from './location-update.component';
import { LocationDeleteDialogComponent } from './location-delete-dialog.component';
import { locationRoute } from './location.route';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    LacusticoSharedModule,
    RouterModule.forChild(locationRoute),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDmNfa5XLklQJ_EhNvuS4zEmQzJZOeqrZg' }),
  ],
  declarations: [LocationComponent, LocationDetailComponent, LocationUpdateComponent, LocationDeleteDialogComponent],
  entryComponents: [LocationDeleteDialogComponent],
})
export class LacusticoLocationModule {}
