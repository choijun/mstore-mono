window.KMS || (function(window) {
    window.KMS = {
        loadView: function(viewName) {
            window.location.hash = viewName;
        },
        init: function(config) {

        },
        String: {
            format: function (input) {
                var args = arguments;
                return input.replace(/\{(\d+)\}/g, function (match, capture) {
                    return args[1 * capture + 1];
                });
            },
            toCurrency: function(amount) {
                return '$' + (amount / 100).toFixed(2);
            }      
        },
        Dom: {
            mergeCls: function(base) {
                if (arguments.length > 1) {
                    for (var i = 1, cls; (cls = arguments[i]) != null; ++i) {
                        base += ' ' + cls;
                    }
                }
                return base;
            }
        },
        Cache: {
            _cache: {},
            hasLocalStorage: function() {
                try {
                    return 'localStorage' in window && window['localStorage'] !== null;
                } catch (e) {
                    return false;
                }
            },
            get: function(key) {
                if (this.hasLocalStorage()) {
                    return localStorage.getItem(key) || undefined;
                } else {
                    return this._cache[key] || undefined;
                }
            },
            set: function(key, value) {
                if (this.hasLocalStorage()) {
                    localStorage.setItem(key, value);
                } else {
                    this._cache[key] = value;
                }
            },
            remove: function(key) {
                if (this.hasLocalStorage()) {
                    localStorage.removeItem(key);
                } else {
                    delete this._cache[key];
                }
            }
        },        
        PubSub: {
            subscribers: function() {
                if (!this._subscribersMap) {
                    this._subscribersMap = {};
                }
                return this._subscribersMap;
            },
            subscribe: function(name, cb) {
                var subs = this.subscribers();
                if (!subs[name]) {
                    subs[name] = [cb];
                } else {
                    subs[name].push(cb);
                }
            },
            unsubscribe: function(name, cb) {
                var subs = this.subscribers()[name];
                $.each(subs, function(key, value) {
                    if (value == cb) {
                        subs[key] = null;
                    }
                })

            },
            clear: function(name) {
                delete this.subscribers()[name];
            },
            publish: function() {
                var args = Array.prototype.slice.call(arguments),
                    name = args.shift();
                $.each(this.subscribers()[name], function(index, sub) {
                    if (sub) {
                        sub.apply(this, args);
                    }
                })
            }
        }
    }
}).call({}, window.inDapIF ? parent.window : window);