<template>
  <section id="compare-users">
    <h2>{{ user.email }} has the following goals:</h2>
    <li v-for="goal in user.goals" :key="goal.id">
      {{goal.name}} 
    </li>
    <!-- {{ goals }} -->
    

  </section>
</template>

<script>

export default {
  props: {
    user: Object,
    // goals: Object
  },
};
</script>

<style>

#compare-users {
  background-color: yellow;
}

h2 {
  margin: 0px;
}
</style>
