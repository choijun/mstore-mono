import Vue from 'vue';
import Router from 'vue-router';
import Home from '~/components/home/home.vue';
import Products from '~/components/products/products.vue';
import Product from '~/components/products/product.vue';

Vue.use(Router);

export default new Router({
  strict: process.env.NODE_ENV !== 'production',
  routes: [
    { path: '/', component: Home },
    { path: '/products', component: Products },
    { path: '/products/:id', component: Product },
  ]
})