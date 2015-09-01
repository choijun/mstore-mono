(function () {
  'use strict';

  function CacheService() {
    this._cache = {};
  }

  CacheService.prototype.hasLocalStorage = function() {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  };

  CacheService.prototype.get = function(key) {
    if (this.hasLocalStorage()) {
      return localStorage.getItem(key) || undefined;
    } else {
      return this._cache[key] || undefined;
    }
  };

  CacheService.prototype.set = function(key, value) {
    if (this.hasLocalStorage()) {
      localStorage.setItem(key, value);
    } else {
      this._cache[key] = value;
    }
  };

  CacheService.prototype.remove = function(key) {
    if (this.hasLocalStorage()) {
      localStorage.removeItem(key);
    } else {
      delete this._cache[key];
    }
  };

  angular.module('mstore.services').service('CacheService', CacheService);
})();