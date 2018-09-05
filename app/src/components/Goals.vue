<template>
  <div class="goals">
    <h2> Goals </h2>
    <nav>
      <router-link to="/goals/list">list</router-link>
      &nbsp;
      <router-link to="/goals/new">add</router-link>
    </nav>
    <router-view 
      :goals="goals"
      :on-add="handleAdd"
    ></router-view>
  
  </div>
</template>

<script>
import { addGoal } from '../services/api';
import { getGoals } from '../services/api';
export default {
  data() {
    return { 
      goals: null
    };
  },
  created() {
    getGoals()
      .then(goals => {
        this.goals = goals;
      });
  },
  methods: {
    handleAdd(goal) {
      return addGoal(goal)
        .then(saved => {
          this.goals.push(saved);
          this.$router.push('/goals/list');
        });
    }
  }
};
</script>

<style scoped>
.goals {
  text-align: center;
}
</style>