import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';

const routes : Routes = [{
  path: 'products',
  children: [{
    path: '', component: ProductListComponent,
  }, {
    path: ':id', component: ProductDetailComponent,
  }],
}];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
})
export class ProductModule { }
