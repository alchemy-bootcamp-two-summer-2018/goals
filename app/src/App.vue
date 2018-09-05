<template>
  <div id="app">
    <Header/>
    <nav>
      <RouterLink class="nav-link" to="/">Home</RouterLink>
      <RouterLink v-if="!user" class="nav-link" to="/auth">Sign In</RouterLink>
      <RouterLink v-if="user" class="nav-link" to="/goals">Goals</RouterLink>
    </nav>
    <RouterView :onUser="handleUser"></RouterView>
  </div>
</template>

<script>

import Header from './components/Header.vue';

export default {
  name: 'app',
  data() {
    return {
      user: null
    }
  },
  methods: {
    handleUser(user) {
      this.user = user;
    }
  },
  components: {
    Header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.nav-link {
  padding: 50px;
}
</style>
