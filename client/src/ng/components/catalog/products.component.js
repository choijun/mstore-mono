import { Component } from '@angular/core';
import { ProductService } from './product.service';
import template from './products.component.html';

@Component({
  selector: 'products',
  template,
})
export class ProductsComponent {
  static get parameters() {
    return [[ProductService]];
  }

  constructor(productService) {
    this.productService = productService;
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => this.products = products,
      error => console.error(error)
    );
  }
}