<template>
  <li>
    <div class="title">
      <h3>Email: {{user.email}}</h3>
      <div v-for="(goal, i) in user.goals" :key="goal.description">
      <p> Goal #{{i+1}}: {{goal.description}}</p>
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