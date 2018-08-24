import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { BehaviorSubject } from 'rxjs';
import { Cart } from './cart';

@Component({
  selector: 'cart-summary',
  template: `<a class="nav-link" href="javascript:void(0)">
    Cart
    <span class="badge badge-pill badge-primary">{{totalItem}}</span>
  </a>`,
})
export class CartSummaryComponent implements OnInit {
  totalItem: number = 0;

  constructor(private cartService: CartService) { }

  async ngOnInit(): Promise<void> {
    this.cartService.cartSubject.subscribe(cartDetail => this.totalItem = cartDetail.length);
    this.cartService.cartSubject.next(await this.cartService.getCartDetails());
  }
}