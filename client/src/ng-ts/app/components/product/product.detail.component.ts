import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { Product } from './product';
import { Item } from './item';

@Component({
  selector: 'product',
  templateUrl: 'product.detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  productId: string = '';
  product: Product | any = {};
  activeItem: Item | any = {};
  quantity: number = 1;

  constructor(route: ActivatedRoute, private productService: ProductService) {
    this.productId = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.productService.getProductById(this.productId).subscribe(product => {
      this.product = product;
      (this.product.items && this.product.items.length) && (this.activeItem = this.product.items[0]);
    });
  }

  addToCart() {
    console.log(this.quantity)
  }
}