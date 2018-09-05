<template>
  <li>
    <div class="title">
      <h3>EMAIL: {{user.email}}</h3>
      <div v-for="(goal, i) in user.goals" :key="goal.description">
      <p> GOAL #{{i+1}}: {{goal.description}}</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    user: Object
  }
};
</script>

<style scoped>

</style>