import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../common/api.service';
import { CacheService } from '../../common/cache.service';
import { Cart } from './cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService extends ApiService {
  cartSubject: BehaviorSubject<Cart[]> = new BehaviorSubject<Cart[]>([]);

  constructor(http: HttpClient, private cacheService: CacheService) {
    super(http);
  }

  async getCartId(): Promise<string> {
    let cartId: string = this.cacheService.get('cartId');
    if (!cartId) {
      cartId = await this.http.get<string>('api/carts/cart-id', { responseType: 'text' as 'json' }).toPromise();
    }
    this.cacheService.set('cartId', cartId);
    return cartId;
  }

  async getCartDetails(): Promise<Cart[]> {
    const cartId: string = await this.getCartId();
    return await this.get<Cart[]>(`api/carts/${cartId}`, []);
  }
}