<template>
  <li class="goal">
    <h3>{{ goal. name }}</h3>
    <p v-if="goal.completed">Completed</p>
    <p v-else>Not completed</p>
  </li>    
</template>

<script>
export default {
  props: {
    goal: Object
  }
};
</script>

<style>
.goal {
  list-style: none;
}

</style>
