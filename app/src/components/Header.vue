<template>
    <header>
    <img class="logo" alt="Bacon" src="../assets/logo.png">
    
    <div>
      <h1>Bacon</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink v-if="user" to="/goals">Goals</RouterLink>
        <RouterLink v-if="user" to="/users">Users</RouterLink>
        <RouterLink v-if="!user" to="/auth">Sign In</RouterLink>
        <a v-if="user" href="/" @click.prevent="handleSignOut">Sign Out</a>
      </nav>
      <span v-if="user">user: {{ user.email }}</span>
    </div>

    <img class="flag" alt="Murica" src="../assets/flag.png">

  </header>
</template>

<script>
import { checkForToken, signOut } from '../services/api';

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

img.logo {
  width: 200px;
  height: 200px;
}

img.flag {
  height: 200px;
}

a {
  display: inline-block;
  width: 140px;
  font-size: 24px;
  padding: 10px;
  margin: 15px;
  border: 1px solid black;
  text-decoration: none;
  color: black;
  text-shadow: 1px 1px white;
  border-radius: 5px;
  box-shadow: 0.5px 0.5px 0.5px black;
  background-color: rgba(65,214,195,0);
  border: 4px solid #ffd90000;
}

a:hover {
  background-color: #fea793;
  box-shadow: 0.9px 0.9px 0.9px black;
  border: 4px solid rgba(243, 221, 97, 0.582);
}

h1 {
  font-family: 'Baloo Tammudu', cursive;
  font-size: 74px;
  font-weight: normal;
  display: inline-block;
  height: 100px;
  margin: 5px 0px 0px 0px;
  text-transform: uppercase;
  color: black;
  text-shadow: 2px 2px white;
}

nav {
  padding-bottom: 20px;
}

header {
  display: grid;
  grid-template-columns: 25% 50% 25%;
  box-shadow: 3px 2px 2px black;
  background: #fea793;
}

header:hover {
  background: #fff8ed;
}

</style>
