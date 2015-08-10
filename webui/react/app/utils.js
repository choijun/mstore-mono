class mStore {
  constructor() {

  }
  
  init(config) {
    return 1;
  }
}

window.MSTORE || (function(window) {
  window.MSTORE = new mStore();
}).call({}, window.inDapIF ? parent.window : window);
