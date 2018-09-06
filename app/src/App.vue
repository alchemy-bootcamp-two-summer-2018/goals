<template>
  <div id="app">
    <header>
      <h1>Goals</h1>
      <nav>
        <RouterLink to="/">Go to <strong>Home</strong></RouterLink>
        <RouterLink v-if="user" to="/goals">Go to Goals</RouterLink>
        <RouterLink v-if="!user" to="/auth">Sign In</RouterLink>
        <a v-if="user" href="/" @click.prevent="handleSignOut">Sign Out</a>
      </nav>
      <span v-if="user">user: {{ user.email }}</span>
    </header>
    <RouterView :onUser="handleUser"/>
  </div>
</template>

<script>
import { checkForToken, signOut } from './services/api';

export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    this.user = checkForToken();
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
</style>
