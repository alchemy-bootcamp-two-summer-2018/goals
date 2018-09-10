<template>
  <div>
    <h3>Goals Map</h3>
    <p>
      I would display map with 
      {{ goals.length }}
      markers
    </p>
  </div>
</template>

<script>
export default {
  props: ['goals']
};
</script>

<style scoped>
</style>