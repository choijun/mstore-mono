import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { CartSummaryComponent } from './cart-summary.component';
import { CartDetailComponent } from './cart-detail.component';

const routes : Routes = [{
  path: 'cart', component: CartDetailComponent,
}];

@NgModule({
  declarations: [
    CartSummaryComponent,
    CartDetailComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [
    CartSummaryComponent,
    CartDetailComponent,
  ]
})
export class CartModule { }
