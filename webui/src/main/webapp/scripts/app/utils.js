window.MSTORE || (function(window) {
    window.MSTORE = {
        loadView: function(viewName) {
            window.location.hash = viewName;
        },
        init: function(config) {
            if (config.routes) {
                MSTORE.Route.initRoutes(config.routes, config.defaultView);
                window.addEventListener('hashchange', MSTORE.loadViewFromHash);
                if (config.ready) {
                    config.ready();
                }
            }
        },
        loadViewFromHash: function() {
            var params = window.location.hash.substr(1).split('/'),
                viewName = params.length > 0 ? params.shift() : '';

            if (params.length > 0) {
                viewName += '/{id}';
            }

            var view = MSTORE.Route.getView(viewName);
            if (view) {
                React.render(React.createElement(view, { params: params }), $('.main-container').get(0));
            } else {
                MSTORE.loadView(MSTORE.Route._default);
            }
        },
        Route: {
            _routes: {},
            _default: 'home',
            initRoutes: function(routes, defaultView) {
                this._routes = routes;
                this._default = defaultView;
            },
            getView: function(viewName) {
                return this._routes[viewName];
            }
        },
        String: {
            format: function (input) {
                var args = arguments;
                return input.replace(/\{(\d+)\}/g, function (match, capture) {
                    return args[1 * capture + 1];
                });
            },
            toCurrency: function(amount) {
                return '$ ' + (amount / 100).toFixed(2);
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
        },
        Cookie: {
            set: function(key, value, expiredDays) {
                var d = new Date();
                d.setTime(d.getTime() + (expiredDays*24*60*60*1000));
                var expires = "expires="+d.toUTCString();
                document.cookie = key + "=" + value + "; " + expires;
            },
            get: function(key) {
                var name = key + "=";
                var ca = document.cookie.split(';');
                for(var i=0; i<ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1);
                    if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
                }
                return "";
            }
        }
    }
}).call({}, window.inDapIF ? parent.window : window);
