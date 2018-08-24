import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CacheService {
  _cache = {};

  hasLocalStorage() {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  }

  get(key: string) {
    if (this.hasLocalStorage()) {
      return localStorage.getItem(key) || undefined;
    } else {
      return this._cache[key] || undefined;
    }
  }

  set(key: string, value: any) {
    if (this.hasLocalStorage()) {
      localStorage.setItem(key, value);
    } else {
      this._cache[key] = value;
    }
  }

  remove(key: string) {
    if (this.hasLocalStorage()) {
      localStorage.removeItem(key);
    } else {
      delete this._cache[key];
    }
  }
}