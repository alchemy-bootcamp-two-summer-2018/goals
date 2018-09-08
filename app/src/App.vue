<template>
  <div id="app">
    <!-- <Header/> -->
    <header>
      <div class="title-and-logo">
        <h1>Goal Tracker</h1>
        <img src="./assets/check.png">
      </div>
      <div class="desktop">
          <span id="desktop-welcome-user" v-if="user"><i>User: {{ user.email }}</i></span>
          <div class="desktop-nav">
            <RouterLink class="desktop-nav-el" to="/">HOME</RouterLink>
            <RouterLink class="desktop-nav-el" v-if="user" to="/goals">GOALS</RouterLink>
            <!-- <RouterLink class="desktop-nav-el" v-if="user" to="/add">ADD GOALS</RouterLink> -->
            <!-- <RouterLink class="desktop-nav-el" v-if="user" to="/status">YOUR GOALS</RouterLink> -->
            <!-- <RouterLink class="desktop-nav-el" v-if="user" to="/compare">COMPARE GOALS</RouterLink> -->
            <RouterLink class="desktop-nav-el" v-if="!user" to="/auth">SIGN IN</RouterLink>
            <a class="desktop-nav-el" v-if="user" href="/" @click.prevent="handleSignOut">SIGN OUT</a>
          </div>
      </div>

      <div class="mobile">
        <button class="header-button" @click="openMenu" v-show="!menuIsOpen">Menu</button>
        <div v-show="menuIsOpen">
          <div class="mobile-nav">        
            <RouterLink class="mobile-nav-el" to="/">HOME</RouterLink>
            <RouterLink v-if="user" class="mobile-nav-el" to="/goals">GOALS</RouterLink>
            
            <!-- <RouterLink v-if="user" class="mobile-nav-el" to="/add">ADD GOALS</RouterLink> -->
            <!-- <RouterLink v-if="user" class="mobile-nav-el" to="/status">YOUR GOALS</RouterLink> -->
            <!-- <RouterLink v-if="user" class="mobile-nav-el" to="/compare">COMPARE GOALS</RouterLink> -->
            <RouterLink v-if="!user" class="mobile-nav-el" to="/auth">SIGN IN</RouterLink>
            <a class="mobile-nav-el" v-if="user" href="/" @click.prevent="handleSignOut">SIGN OUT</a>
            <span id="mobile-welcome-user" v-if="user">User: {{ user.email }}</span>
            <button class="header-button" @click="closeMenu">Close Menu</button>
          </div>
        </div>
      </div>
    </header>
    <RouterView :onUser="handleUser"></RouterView>
  </div>
</template>

<script>

import { checkForToken, signOut } from './services/api';

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
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Slabo+27px" rel="stylesheet');

.title-and-logo {
  display: flex;
  justify-content: center;
}

h1 {
  text-align: center;
  font-size: 50px;
  margin: 0px;
  font-family: 'Slabo 27px', serif;
}

img{ 
  padding-top: 10px;
  width: 50px;
  height: 50px;
}

header {
  background-color: lightblue;
}

@media(max-width: 500px) {
  .desktop {
    display: none;
  }

  .mobile-nav{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .mobile-nav-el:hover{
    background-color: red;
  }

  #mobile-welcome-user,
  .mobile-nav-el{
    text-align: center;
    margin: 25px;
    font-size: 35px;
    text-decoration: none;
    justify-content: center;
  }

  .mobile-nav-el{
    border: 5px solid blue;
    width: 90%;
  }

  .header-button {
    display: flex;
    width: 100%;
    justify-content: center;
    background-color: red;
    font-size: 35px;
    margin: 0px;
  }
}

@media (min-width: 500px) {
  .mobile {
    display: none;
  }

  .desktop-nav {
    display: flex;
    justify-content: space-between;
    margin: 0px;
  }

  .desktop-nav-el:hover {
    background-color: red;
  }
  .desktop-nav-el {
    text-decoration: none;
    font-size: 35px;
    width: 100%;
    border: 5px solid red;
    text-align: center;
  }

  #desktop-welcome-user{
    display: block;
    font-size: 25px;
    text-align: right;
    margin-right: 75px;
  }
}


</style>
