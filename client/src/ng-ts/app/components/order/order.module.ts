import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { CheckoutComponent } from './checkout.component';
import { OrderAddressComponent } from './order-address.component';

const routes : Routes = [{
  path: 'checkout', component: CheckoutComponent,
}];

@NgModule({
  declarations: [
    OrderAddressComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [
    CheckoutComponent,
  ]
})
export class OrderModule { }
