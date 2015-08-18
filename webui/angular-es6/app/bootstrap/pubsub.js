'use strict';

export default class PubSub {
  constructor() {}

  subscribers() {
    if (!this._subscribersMap) {
      this._subscribersMap = {};
    }
    return this._subscribersMap;
  }

  subscribe(name, cb) {
    var subs = this.subscribers();
    if (!subs[name]) {
      subs[name] = [cb];
    } else {
      subs[name].push(cb);
    }
  }

  unsubscribe(name, cb) {
    var subs = this.subscribers()[name];
    angular.forEach(subs, (value, key) => {
      if (value == cb) {
        subs[key] = null;
      }
    });
  }

  clear(name) {
    delete this.subscribers()[name];
  }

  publish() {
    var args = [].slice.call(arguments),
        name = args.shift();
    angular.forEach(this.subscribers()[name], (sub) => {
      if (sub) {
        sub.apply(this, args);
      }
    });
  }
}
