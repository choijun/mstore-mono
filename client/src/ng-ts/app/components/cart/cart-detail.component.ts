import { Component, OnInit } from '@angular/core';
import { Cart } from './cart';
import { CartService } from './cart.service';

@Component({
  selector: 'cart-detail',
  templateUrl: 'cart-detail.component.html',
})
export class CartDetailComponent implements OnInit {
  cart: Cart | any = { items: [] };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartSubject.subscribe(cart => this.cart = cart);
  }
}