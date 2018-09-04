<template>
  <div id="app">
    <header>
      <h1>Goals</h1>
      
      <nav>
        <router-link to="/">Go <strong>Home</strong></router-link>
        &nbsp;
        <router-link to="/goals">Go to Goals</router-link>
        &nbsp;
        <router-link to="/users">Go to Users</router-link>
        &nbsp;
        <router-link v-if="!user" to="/auth">Sign In</router-link>
        &nbsp;
        <a v-if="user" href="/" @click.prevent="handleSignOut">Sign Out</a>
      </nav>

      <span v-if="user">user: {{ user.email }}</span>
    </header>

    <RouterView/>
  </div>
</template>

<script>


export default {
  
};

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

h1, nav {
    text-decoration: none;
    text-align: center;
}
</style>