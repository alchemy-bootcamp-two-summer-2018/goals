<template>
  
  <header>
    <h2>Goals goals goals!</h2>
    <RouterLink class="nav-link" to="/">Home</RouterLink>
    <RouterLink v-if="user" class="nav-link" to="/goals">Goals</RouterLink>
    <RouterLink v-if="!user" class="nav-link" to="/auth">Sign In</RouterLink>
    <a v-if="user" href="/" @click.prevent="handleSignOut">Sign Out</a>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      user: null
    };
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
};
</script>

<style scoped>
  div {
    border: 1px solid red;
  }
  .header {
    display: flex;
    justify-content: space-between;
  }
  .links {
    display: none;
  }
</style>
