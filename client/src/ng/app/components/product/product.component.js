import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import template from './product.component.html';

@Component({
  selector: 'product',
  template,
})
export class ProductComponent {
  static get parameters() {
    return [[ActivatedRoute], [ProductService]];
  }

  constructor(route, productService) {console.log({route,productService});
    this.productId = route.snapshot.paramMap.get('id');
    this.productService = productService;
  }

  ngOnInit() {console.log(this.productService, this.productId);
    this.productService.getProductById(this.productId).subscribe(
      product => this.product = product,
      error => console.error(error)
    );
  }
}