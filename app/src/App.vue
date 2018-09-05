<template>
  <div id="app">
    <header>
      <h1>Track Your Goals</h1>
      
      <nav class="nav">
        <router-link to="/">Go <strong>Home</strong></router-link>
        &nbsp;
        <router-link v-if="user" to="/goals">Go to Goals</router-link>
        &nbsp;
        <router-link v-if="user" to="/users">Go to Users</router-link>
        &nbsp;
        <router-link v-if="!user" to="/auth">Sign In</router-link>
        &nbsp;
        <a v-if="user" href="/" @click.prevent="handleSignOut">Sign Out</a>
      </nav>
      <div></div>
      <span v-if="user">user: {{ user.email }}</span>
    </header>

    <router-view :onUser="handleUser"></router-view>
  </div>
</template>

<script>
import { checkForToken, signOut } from './services/api.js';


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
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
} */

.nav {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

header {
    text-align: center;
}

a {
  background-color:#E6FDFF;
  color: black;
  padding: 3px;
  text-decoration: none;
}
@-webkit-keyframes swing
{
    15%
    {
        -webkit-transform: translateX(5px);
        transform: translateX(5px);
    }
    30%
    {
        -webkit-transform: translateX(-5px);
       transform: translateX(-5px);
    } 
    50%
    {
        -webkit-transform: translateX(3px);
        transform: translateX(3px);
    }
    65%
    {
        -webkit-transform: translateX(-3px);
        transform: translateX(-3px);
    }
    80%
    {
        -webkit-transform: translateX(2px);
        transform: translateX(2px);
    }
    100%
    {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
}
@keyframes swing
{
    15%
    {
        -webkit-transform: translateX(5px);
        transform: translateX(5px);
    }
    30%
    {
        -webkit-transform: translateX(-5px);
        transform: translateX(-5px);
    }
    50%
    {
        -webkit-transform: translateX(3px);
        transform: translateX(3px);
    }
    65%
    {
        -webkit-transform: translateX(-3px);
        transform: translateX(-3px);
    }
    80%
    {
        -webkit-transform: translateX(2px);
        transform: translateX(2px);
    }
    100%
    {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
}
a:hover {
  background-color: #DBF9F4;
   -webkit-animation: swing 1s ease;
        animation: swing 1s ease;
        -webkit-animation-iteration-count: 1;
        animation-iteration-count: 1;
}

a:active {
  background-color: #383961;
  color: white;
}


span {
  text-align: center;
}
</style>