<template>
  <div id="app">
    <header>
        <nav>
          <div class="links1">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
            &nbsp;
            <RouterLink class="nav-link" to="/goals">Goals</RouterLink>
            &nbsp;
          </div>
          <div class="logo">
            <img src="http://inspower.co/wp-content/uploads/2015/11/do-what-you-love-cg.jpg" alt="Do what you love. Love what you do.">
          </div>
          <div class="links2">
            <RouterLink v-if="!user" to="/auth" class="nav-link">Sign In</RouterLink>
            &nbsp;
            <a v-if="user" class="nav-link" href="/" @click.prevent="handleSignOut">Sign Out</a>
            <a class="nav-link">About</a>
          </div>
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

<style scoped>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
} */

nav {
  display: flex;
  width: 100vw;
  justify-content: space-around;
}

nav div {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

nav img {
  height: 300px;
}

.links1,
.links2 {
  flex-grow: 2;
}

.nav-link {
  text-decoration: none;
  color: black;
  font-family: 'Amatic SC', sans-serif;
  font-size: 40px;
}

</style>
