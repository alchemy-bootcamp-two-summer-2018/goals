<template>
  <div>
    <h3>Goals List</h3>
    <NewGoal :onAdd="handleAdd"/>
    <div v-if="goals">
      <p
        v-for="goal in goals"
        :key="goal.id"
      >
        {{ goal.goal }}
        {{ goal.status }}
      </p>
    </div>
  </div>
</template>

<script>
import { addGoal, getGoals } from '../services/api';
import NewGoal from './NewGoal';

export default {
  data() {
    return {
      goals: null,
    };
  },
  created() {
    getGoals()
      .then(goals => {
        this.goals = goals;
        console.log('goals', this.goals);
      });
  },
  methods: {
    handleAdd(goal) {
      return addGoal(goal)
        .then(saved => {
          this.goals.push(saved);
          this.$router.push('/goals');
        });
    }
  },
  components: {
    NewGoal
  }
};

</script>

<style>

</style>
