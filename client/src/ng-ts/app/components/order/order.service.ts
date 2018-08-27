import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../common/api.service';
import { CartService } from '../cart/cart.service';
import { Address } from './address';
import { Order } from './order';

@Injectable({ providedIn: 'root' })
export class OrderService extends ApiService {
  constructor(http: HttpClient, private cartService: CartService) {
    super(http);
  }

  async placeOrder(billingAddress: Address, shippingAddress: Address): Promise<void> {
    const cartId = await this.cartService.getCartId();
    await this.post<Order | any>('api/orders', {
      cartId,
      billingAddress,
      shippingAddress,
    }, {});
    this.cartService.removeCartId();
  }
}