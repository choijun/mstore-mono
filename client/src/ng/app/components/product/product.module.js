import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ProductService } from './product.service';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product.component';

const ROUTES = [{
  path: 'products',
  children: [{
    path: '', component: ProductsComponent,
  }, {
    path: ':id', component: ProductComponent,
  }],
}];

@NgModule({
  declarations: [ // registering our container component
    ProductsComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(ROUTES),
  ],
  providers: [ // add the service to our sub-module
    ProductService,
  ],
  exports: [ // exporting so our root module can access
    ProductsComponent,
    ProductComponent,
  ],
})
export class ProductModule { }