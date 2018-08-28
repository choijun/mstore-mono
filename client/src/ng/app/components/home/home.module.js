import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const ROUTES = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [ HomeComponent ],
  imports: [
    BrowserModule,
    RouterModule.forChild(ROUTES, { useHash: true }),
  ],
})
export class HomeModule { }