<template>
    <div id="app">
    <header>
      <nav>
        <RouterLink to="/">Go Home</RouterLink>
        &nbsp;
        <RouterLink v-if="user" to="/goals">Go to Goals</RouterLink>
        &nbsp;
        <RouterLink v-if="!user" to="/auth">Sign In</RouterLink>
        &nbsp;
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
