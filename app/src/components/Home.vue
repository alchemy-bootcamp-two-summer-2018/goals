<template>
  <div>
    <h2>I am the Home component</h2>
    <p>
      Click <router-link to="/users">here</router-link> to get started!
    </p>
    <p>
      See everyone's goals  <router-link to="/goals/1"></router-link>!
    </p>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
