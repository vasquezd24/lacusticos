import { NgModule } from '@angular/core';
import { LacusticoSharedModule } from 'app/shared/shared.module';
import { HomeSearchComponent } from 'app/search/home.search';
import { RouterModule } from '@angular/router';
import { homeSearchRoute } from 'app/search/home.search.route';

@NgModule({
  imports: [LacusticoSharedModule, RouterModule.forChild([homeSearchRoute])],
  declarations: [HomeSearchComponent],
})
export class HomeSearchModule {}
