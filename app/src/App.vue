<template>
  <div id="app">
    <div class="content">
      <header>
          <nav>
            <div class="links1 nav">
              <RouterLink class="nav-link" to="/">Home</RouterLink>
              <a class="nav-link">About</a>
            </div>
            <div class="logo nav">
              <img src="http://inspower.co/wp-content/uploads/2015/11/do-what-you-love-cg.jpg" alt="Do what you love. Love what you do.">
            </div>
            <div class="links2 nav">
              <RouterLink class="nav-link" to="/goals">Goals</RouterLink>
              <RouterLink v-if="!user" to="/auth" class="nav-link">Sign In</RouterLink>
              <a v-if="user" class="nav-link" href="/" @click.prevent="handleSignOut">Sign Out</a>
            </div>
          </nav>
      </header>
      <div v-if="user">
        <h2>You are logged in as {{ user.email }}</h2>
      </div>
      
      <div v-else>
        <h2>Please sign in to continue</h2>
        <RouterLink class="link-button" to="/auth">Log In</RouterLink>
      </div>

      <RouterView :onUser="handleUser"/>

    </div>
    <footer>
      <p>Created at Alchemy Code Lab</p>
    </footer>

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

  .content {
    min-height: 85vh;
  }

  .logo {
    order: -1;
  }

  img {
    width: 80vw;
  }

  nav {
    display: flex;
    width: 100vw;
    flex-direction: column;
  }

  .links1,
  .links2 {
    display: flex;
    flex-direction: column;
    text-align: center;
    height: fit-content;
  }

  .nav-link {
    display: block;
    width: 100vw;
    line-height: 75px;
    margin: 0;
    padding: 0;
    text-decoration: none;
    color: black;
    font-family: 'Amatic SC', sans-serif;
    font-size: 2.5em;
  }

  footer {
    height: 70px;
    height: 15vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 217, 0, 0.596);
  }

@media (min-width: 500px) {

  .logo {
    order: initial;
  }

  nav {
    display: flex;
    width: 100vw;
    justify-content: space-around;
    flex-direction: row;
    border-bottom: 4px solid rgba(255, 217, 0, 0.596);
    border-top: 4px solid rgba(255, 217, 0, 0.596);
    padding: 10px;
  }

  nav div {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .logo {
    flex-grow: 1;
    max-width: 25vw;
  }

  img {
    width: initial;
    max-width: 100%;
    max-height: 100%;
  }

  .links1,
  .links2 {
    flex-grow: 2;
    flex-direction: row;
    height: initial;
  }
  
  .nav-link {
    width: initial;
  }
  
  h2 {
    padding: 50px 20px 20px;
  }

  footer {
    margin-top: -15vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 217, 0, 0.596);
  }
}

</style>
