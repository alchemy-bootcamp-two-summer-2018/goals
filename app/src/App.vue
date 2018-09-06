<template>
  <div id="app">
    <Header 
      :onSignOut="handleSignOut"
      :user="user"
    />
    <router-view :onUser="handleUser"></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { checkForToken, signOut } from './services/api';

export default {
  name: 'app',
  components: {
    Header, Footer
  },
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
      this.$router.push('/logout');
    }
  }


};
</script>

<style>

#app {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  width: 100vw;
}

</style>
