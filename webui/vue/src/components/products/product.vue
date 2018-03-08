<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#/">Home</a></li>
        <li class="breadcrumb-item"><a href="#/products">Products</a></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.name }}</li>
      </ol>
    </nav>
    <section class="row">
      <div class="col-md-6 text-md-center">
        <div class="card">
          <div class="card-body">
              <img :src="'images/products/' + product.id + '.jpg'" v-if="product.id" />
            </a>
          </div>
          <div class="card-footer">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn"
                      v-bind:class="{'btn-primary': item.id === product.activeItem.id, 'btn-outline-primary': item.id !== product.activeItem.id}" 
                      v-for="item in product.items" :key="item.id">
                {{ item.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <h3 v-if="product.activeItem.price">{{ toCurrency(product.activeItem.price) }}</h3>
        <div class="row">
          <div class="col-md-3">
            <input  type="number" class="form-control text-right" 
                    min="1" v-bind:max="product.activeItem.quantity" step="1"
                    v-model="product.quantity" v-if="product.activeItem.quantity > 0" />
            <input type="text" value="0" v-if="product.activeItem.quantity === 0" />
          </div>
          <div class="col-md-3">
            <button type="button" class="btn btn-primary" v-if="product.activeItem.quantity > 0" v-on:click="addToCart">Add to Cart</button>
            <button type="button" class="btn btn-danger" v-if="product.activeItem.quantity === 0">Sold out</button>
          </div>
        </div>
      </div>
    </section>
    <p></p>
    <h2>Reviews</h2>
    <div class="card" v-for="review in product.reviews" :key="review.id">
      <div class="card-body">
        <h3>{{ review.headline }}</h3>
        <p class="text-muted"><strong>{{ review.author }}</strong></p>
        <p>{{ review.content }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import CommonService from '~/core/common';

export default {
  computed: {
    ...mapState(['product'])
  },
  methods: {
    ...mapActions(['findProductById']),
    toCurrency: CommonService.toCurrency,
    addToCart: function() {
      console.log(this, this.product.activeItem.id, this.product.quantity);
    },
  },
  mounted() {
    this.findProductById(this.$route.params.id);
  },
};
</script>
