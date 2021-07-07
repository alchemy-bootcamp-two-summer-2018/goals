<template>
  <section>
    <h2>{{ user.email }} has the following goals:</h2>
    <li v-for="goal in user.goals" :key="goal.id">
      {{goal.name}}
    </li>
    

  </section>
</template>

<script>

export default {
  props: {
    user: Object,
  },
};
</script>

<style>

</style>
