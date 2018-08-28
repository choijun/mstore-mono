import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
  static get parameters() { // Angular2+ DI desugar syntax
    return [[HttpClient]];
  }

  constructor(http) {
    this.http = http;
  }

  getProducts() {
    return this.http.get('/api/products');
  }

  getProductById(id) {
    return this.http.get(`/api/products/${id}`);
  }
}