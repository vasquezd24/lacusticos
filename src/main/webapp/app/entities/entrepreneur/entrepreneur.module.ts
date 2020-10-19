import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LacusticoSharedModule } from 'app/shared/shared.module';
import { EntrepreneurComponent } from './entrepreneur.component';
import { EntrepreneurDetailComponent } from './entrepreneur-detail.component';
import { EntrepreneurUpdateComponent } from './entrepreneur-update.component';
import { EntrepreneurDeleteDialogComponent } from './entrepreneur-delete-dialog.component';
import { entrepreneurRoute } from './entrepreneur.route';

@NgModule({
  imports: [LacusticoSharedModule, RouterModule.forChild(entrepreneurRoute)],
  declarations: [EntrepreneurComponent, EntrepreneurDetailComponent, EntrepreneurUpdateComponent, EntrepreneurDeleteDialogComponent],
  entryComponents: [EntrepreneurDeleteDialogComponent],
})
export class LacusticoEntrepreneurModule {}
