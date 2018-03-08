<template>
  <div>
    <header class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#/">mStore</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#/products">Products</a>
          </li>
        </ul>
      </div>
      <form class="form-inline">
        <button type="button" class="btn btn-outline-success mr-sm-2">Cart</button>
        <account></account>
      </form>
    </header>
    <section id="main-container" class="container-fluid">
      <router-view></router-view>
    </section>
    <footer class="navbar fixed-bottom navbar-light bg-light">
      <p class="text-muted">&copy;2018 huytrongnguyen</p>
    </footer>
  </div>
</template>
<style lang="scss">
  #main-container {
    margin: 60px 0;
  }
</style>
<script>
import Account from './account.vue';

export default {
  components: {
    Account,
  },
}
</script>

