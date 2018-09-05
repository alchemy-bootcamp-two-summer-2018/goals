<template>
  <div>
    <h2> Goals </h2>
    <nav>
      <NavLink to="/goals/list">list</NavLink>
      &nbsp;
      <NavLink to="/goals/new">add</NavLink>
    </nav>

    <RouterView 
      :goals="goals"
      :on-add="handleAdd"
    ></RouterView>
  
  </div>
</template>

<script>
import { getGoals, addGoal } from '../services/api';
import NavLink from './NavLink';
export default {
  components: {
    NavLink
  },
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
      goal.userId = this.goal.id;
      return addGoal(goal)
        .then(saved => {
          this.goals.push(saved);
          this.$router.push('/goals');
        });
    }
  }
};
</script>

<style scoped>
pre {
  text-align: left;
}
</style>