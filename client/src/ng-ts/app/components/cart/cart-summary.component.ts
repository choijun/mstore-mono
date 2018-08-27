import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'cart-summary',
  template: `<a class="nav-link" [routerLink]="['/cart']">
    Cart
    <span class="badge badge-pill badge-primary">{{totalItem}}</span>
  </a>`,
})
export class CartSummaryComponent implements OnInit {
  totalItem: number = 0;

  constructor(private cartService: CartService) { }

  async ngOnInit(): Promise<void> {
    this.cartService.cartSubject.subscribe(cart => this.totalItem = (cart.items || []).length);
    this.cartService.cartSubject.next(await this.cartService.getCart());
  }
}