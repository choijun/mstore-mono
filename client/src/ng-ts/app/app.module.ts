import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { HomeModule } from './components/home/home.module';
import { ProductModule } from './components/product/product.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ // Registers particular components within this module
    AppComponent
  ],
  imports: [ // Imports other modules into this module
    BrowserModule,
    RouterModule.forRoot([], { useHash: true }),
    HttpClientModule,
    HomeModule,
    ProductModule,
  ],
  bootstrap: [ AppComponent ], // Tells the module which component to bootstrap
})
export class AppModule { }
