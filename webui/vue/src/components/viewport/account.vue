<template>
  <div>
    <a href="javascript:void(0)" v-if="!currentUser.username" @click="login">Login</a>
    <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span></span> {{ currentUser.username }}
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#">Something else here</a>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'account',
  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
    ...mapActions(['login', 'logout', 'authen']),
  },
  mounted() {console.log(this.currentUser);
    this.authen();
  },
  updated() {
    console.log(this.currentUser)
  }
}
</script>

