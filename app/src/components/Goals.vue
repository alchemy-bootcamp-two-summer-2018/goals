<template>
  <ul>
    <Goal v-for="goal in goals"
      :goal="goal"
      :key="goal.id"
      :name="goal.name"
      :completed="goal.completed"
    />
  </ul>
    
</template>

<script>
import { getGoals } from '../services/api.js';
import Goal from './Goal.vue';

export default {
  data() {
    return {
      goals: null,
      error: null
    };
  },
  components: {
    Goal
  },
  created() {
    getGoals()
      .then(goals => {
        this.goals = goals;
      })
      .catch(err => {
        this.error = err;
      });
  }
};
</script>

<style>

</style>
