import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './components/home/home.module';
import { CatalogModule } from './components/catalog/catalog.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ AppComponent ], // Registers particular components within this module
  imports: [ // Imports other modules into this module
    BrowserModule,
    RouterModule.forRoot([], { useHash: true }),
    HttpClientModule,
    HomeModule,
    CatalogModule,
  ],
  bootstrap: [ AppComponent ], // Tells the module which component to bootstrap
})
export class AppModule { }