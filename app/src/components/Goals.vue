<template>
  <section>
    <ul>
      <Goal v-for="goal in goals"
        :goal="goal"
        :key="goal.id"
        :name="goal.name"
        :completed="goal.completed"
      />
    </ul>
    <GoalForm></GoalForm>
  </section>
</template>

<script>
import { getGoals } from '../services/api.js';
import Goal from './Goal.vue';
import GoalForm from './GoalForm.vue';

export default {
  data() {
    return {
      goals: null,
      error: null
    };
  },
  components: {
    Goal,
    GoalForm
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

<style scoped>

</style>
