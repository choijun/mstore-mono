import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../common/api.service';
import { CartService } from '../cart/cart.service';
import { Product } from './product';
import { Cart } from '../cart/cart';

@Injectable({ providedIn: 'root' })
export class ProductService extends ApiService {
  constructor(http: HttpClient, private cartService: CartService) {
    super(http);
  }

  getProducts(): Promise<Product[]> {
    return this.get<Product[]>('/api/products', []);
  }

  getProductById(id): Promise<Product | any> {
    return this.get<Product | any>(`/api/products/${id}`, {});
  }

  async addToCart(itemId: string, quantity: number): Promise<void> {
    const cartId = await this.cartService.getCartId(),
          cartDetails = await this.post<Cart[]>(`api/carts/${cartId}`, {
            cartId,
            itemId,
            quantity,
          }, []);
    this.cartService.cartSubject.next(cartDetails);
  }
}