<template>
  <div id="app">
    <!-- <Header/> -->
    <header>
      <h1>Goals Goals Goals!</h1>
      <button class="header-button" @click="openMenu">Menu</button>
      <div v-show="menuIsOpen">
        <div class="mobile-nav">        
          <RouterLink class="mobile-nav-el" to="/">HOME</RouterLink>
          <RouterLink v-if="user" class="mobile-nav-el" to="/goals">GOALS</RouterLink>
          <RouterLink v-if="!user" class="mobile-nav-el" to="/auth">SIGN IN</RouterLink>
          <a class="mobile-nav-el" v-if="user" href="/" @click.prevent="handleSignOut">SIGN OUT</a>
          <span id="welcome-user" v-if="user">User: {{ user.email }}</span>
          <button class="header-button" @click="closeMenu">Close Menu</button>
        </div>
      </div>
    </header>
    <RouterView :onUser="handleUser"></RouterView>
  </div>
</template>

<script>

import { checkForToken, signOut } from './services/api';
// import Header from './components/Header.vue';

export default {
  name: 'app',
  data() {
    return {
      user: null,
      menuIsOpen: false
    };
  },
  created() {
    this.user = checkForToken();
  },
  methods: {
    openMenu() {
      this.menuIsOpen = true;
    },
    closeMenu() {
      this.menuIsOpen = false;
    },
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
    // Header
  }
};
</script>

<style>

.mobile-nav{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h1 {
  text-align: center;
  font-size: 50px;
  margin: 0px;
}

header {
  background-color: lightblue;
}

.mobile-nav-el:hover{
  background-color: red;
}

#welcome-user,
.mobile-nav-el{
  text-align: center;
  margin: 25px;
  font-size: 35px;
  text-decoration: none;
  justify-content: center;
}

.mobile-nav-el{
  border: 2px solid blue;
}

.header-button {
  background-color: red;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

/* .nav-link {
  padding: 50px;
} */
</style>
