(function () {
  'use strict';

  function PubSub() {}

  PubSub.prototype.subscribers = function() {
    if (!this._subscribersMap) {
      this._subscribersMap = {};
    }
    return this._subscribersMap;
  };

  PubSub.prototype.subscribe = function(name, cb) {
    var subs = this.subscribers();
    if (!subs[name]) {
      subs[name] = [cb];
    } else {
      subs[name].push(cb);
    }
  };

  PubSub.prototype.unsubscribe = function(name, cb) {
    var subs = this.subscribers()[name];
    angular.forEach(subs, function(value, key) {
      if (value == cb) {
        subs[key] = null;
      }
    });
  };

  PubSub.prototype.clear = function(name) {
    delete this.subscribers()[name];
  };

  PubSub.prototype.publish = function() {
    var args = [].slice.call(arguments),
        name = args.shift();
    angular.forEach(this.subscribers()[name], function(sub) {
      if (sub) {
        sub.apply(this, args);
      }
    });
  };

  angular.module('mstore').service('PubSub', PubSub);
})();
