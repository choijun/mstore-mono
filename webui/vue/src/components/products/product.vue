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
      <div class="col-sm-6 text-md-center">
        <div class="card">
          <div class="card-body">
              <img :src="'images/products/' + product.id + '.jpg'" v-if="product.id" />
            </a>
          </div>
          <div class="card-footer">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary" v-for="item in product.items" :key="item.id">{{ item.name }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <div class="row">
          <div class="col-md-3">
            <input  type="number" class="form-control text-right" 
                    min="1" v-bind:max="product.activeItem.quantity" step="1"
                    v-model="product.quantity" v-if="product.activeItem.quantity > 0" />
          </div>
          <div class="col-md-3">
            <button type="button" class="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState(['product'])
  },
  methods: {
    ...mapActions(['findProductById'])
  },
  mounted: function() {
    this.findProductById(this.$route.params.id);
  }
};
</script>
