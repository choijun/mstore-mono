<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#/">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Products</li>
      </ol>
    </nav>
    <section class="row">
      <article class="col-sm-3 mb-md-4 text-md-center" v-for="prod in products" :key="prod.id">
        <div class="card">
          <div class="card-body">
            <a :href="'#/products/' + prod.id">
              <img :src="'images/products/' + prod.id + '.jpg'" />
            </a>
          </div>
          <div class="card-footer text-muted">
            <a :href="'#/products/' + prod.id">{{ prod.name }}</a>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState(['products'])
  },
  methods: {
    ...mapActions(['findAllProducts'])
  },
  mounted() {
    this.findAllProducts();
  }
};
</script>
