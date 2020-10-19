import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.LacusticoCategoryModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.LacusticoProductModule),
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.LacusticoLocationModule),
      },
      {
        path: 'subscriptor',
        loadChildren: () => import('./subscriptor/subscriptor.module').then(m => m.LacusticoSubscriptorModule),
      },
      {
        path: 'entrepreneur',
        loadChildren: () => import('./entrepreneur/entrepreneur.module').then(m => m.LacusticoEntrepreneurModule),
      },
      {
        path: 'delivery-platform',
        loadChildren: () => import('./delivery-platform/delivery-platform.module').then(m => m.LacusticoDeliveryPlatformModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class LacusticoEntityModule {}
