import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

const ROUTES = [];

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(ROUTES),
  ],
})
export class CartModule { }