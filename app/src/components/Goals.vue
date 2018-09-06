<template>
    <div>
    <ul>
        <li
            v-for="goal in goals"
            :key="goal.id"
        >
          {{ goal.name }} {{ goal.user_id }} 
        </li>
    </ul>
    </div>
</template>

<script>
import { getGoals } from '../services/api';

export default {
  data() {
    return {
      goals: null,
      error: null
    };
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
