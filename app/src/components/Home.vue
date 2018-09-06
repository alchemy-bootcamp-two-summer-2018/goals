<template>
  <main>
    <h2>Can you bring home the bacon?</h2>
    <p>
      Here at bacon, we think goal setting matters. We want to help people achieve what they desire, which is bringing home the bacon.
    </p>
    <p class="center">
      <img src="../assets/bacon.gif" />
    </p>
    <p class="center" v-if="!user">
      Click <router-link to="/auth">here</router-link> to sign in!
    </p>
  </main>
</template>

<script>



export default {

  props: {
    user: Object,
  },

  data() {
    return {
      proof: `
        
      `
    };
  }


};
</script>

<style scoped>

h2 {
  font-size: 36px;
}

p.center {
  text-align: center;
}

p {
  font-size: 18px;
  text-align: left;
  width: 30%;
  padding: 10px;
  margin: 10px auto;
}

img {
  width: 100%;
}

@media screen and (max-width: 480px) {

    p {
    width: 50%;
    }

    h2 {
      margin: 5% 10%;
    }
    
}

</style>
