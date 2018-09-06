<template>
    <div>
        <p>
      Click <router-link to="/goals">here</router-link> to get started!
    </p>
    <!-- <p>Goals in <router-link to="/goals/1">Goals!</router-link>! -->
    <ul>
        <li
            v-for="goal in goals"
            :key="goal.id"
        >
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
