<template>
  <div id="app">
    <Header/>
    <nav>
      <RouterLink class="nav-link" to="/">Home</RouterLink>
      <RouterLink v-if="!user" class="nav-link" to="/auth">Sign In</RouterLink>
      <RouterLink v-if="user" class="nav-link" to="/goals">Goals</RouterLink>
      <a v-if="user" href="/" @click.prevent="handleSignOut">Sign Out</a>
    </nav>
    <span v-if="user">user: {{ user.email }}</span>
    <RouterView :onUser="handleUser"></RouterView>

  </div>
</template>

<script>

import { checkForToken, signOut } from './services/api';
import Header from './components/Header.vue';

export default {
  name: 'app',
  data() {
    return {
      user: null
    };
  },
  created() {
    this.user = checkForToken();
    // this.goal = getGoals();
  },
  methods: {
    handleUser(user) {
      this.user = user;
    },
    handleSignOut() {
      signOut();
      this.user = null;
      this.$router.push('/');
    }
  },
  components: {
    Header
  }
};
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
