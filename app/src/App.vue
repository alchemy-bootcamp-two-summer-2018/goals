<template>
    <div id="app">
    <header>
      <nav>
        <RouterLink to="/">Go Home</RouterLink>
        &nbsp;
        <RouterLink to="/about">Go to About</RouterLink>
        &nbsp;
        <RouterLink v-if="user" to="/goals">Go to Goals</RouterLink>
        &nbsp;
        <RouterLink v-if="!user" to="/auth">Sign In</RouterLink>
        &nbsp;
        <a v-if="user" href="/" @click.prevent="handleSignOut">Sign Out</a>
      </nav>

      <span v-if="user">user: {{ user.email }}</span>
    </header> 

    <RouterView :onUser="handUser"/>
    </div>
</template>

<script>

export default {
  data() {
    return {
      user: null
    };
  },
  methods: {
    handleUser(user) {
      this.user = user;
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
