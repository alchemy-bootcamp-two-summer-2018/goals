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
import { addGoal } from '../services/api';
import NavLink from './NavLink';
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
  components: {
    NavLink
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
pre {
  text-align: left;
}
</style>