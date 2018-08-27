import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart/cart';
import { CartService } from '../cart/cart.service';
import { Address } from './address';
import { OrderService } from './order.service';

@Component({
  selector: 'checkout',
  templateUrl: 'checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  cart: Cart | any = { items: [] };
  billingAddress: Address;
  shippingAddress: Address;

  constructor(private cartService: CartService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.cartService.cartSubject.subscribe(cart => this.cart = cart);
    this.billingAddress = {
      fullName: '<fullName>',
      address1: '<address1>',
      address2: '<address2>',
      city: '<city>',
      state: '<state>',
      country: '<country>',
      zipCode: '<zipCode>',
      phone: '<phone>',
      email: '<email>'
    };
    this.shippingAddress = {
      fullName: '<fullName>',
      address1: '<address1>',
      address2: '<address2>',
      city: '<city>',
      state: '<state>',
      country: '<country>',
      zipCode: '<zipCode>',
      phone: '<phone>',
      email: '<email>'
    };
  }

  placeOrder() {
    this.orderService.placeOrder(this.billingAddress, this.shippingAddress);
  }
}