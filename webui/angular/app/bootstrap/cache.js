(function () {
  'use strict';

  function Cache() {
    this._cache = {};
  }

  Cache.prototype.hasLocalStorage = function() {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  };

  Cache.prototype.get = function(key) {
    if (this.hasLocalStorage()) {
      return localStorage.getItem(key) || undefined;
    } else {
      return this._cache[key] || undefined;
    }
  };

  Cache.prototype.set = function(key, value) {
    if (this.hasLocalStorage()) {
      localStorage.setItem(key, value);
    } else {
      this._cache[key] = value;
    }
  };

  Cache.prototype.remove = function(key) {
    if (this.hasLocalStorage()) {
      localStorage.removeItem(key);
    } else {
      delete this._cache[key];
    }
  };

  angular.module('mstore').service('Cache', Cache);
})();
