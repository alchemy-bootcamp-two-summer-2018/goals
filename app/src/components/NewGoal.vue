<template>
  <section>
    <GoalForm
      label="Add"
      :on-add="handleAdd"/>
  </section>
  
</template>

<script>
import GoalForm from './GoalForm.vue';
import { addGoal } from '../services/api.js';

export default {
  components: {
    GoalForm
  },
  methods: {
    handleAdd(goal) {
      return addGoal(goal)
        .then(saved => {
          this.goals.push(saved);
          this.$router.push('goals');
        });
    }
  }
};
</script>

<style>

</style>
