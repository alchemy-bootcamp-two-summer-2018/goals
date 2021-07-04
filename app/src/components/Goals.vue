<template>
  <div>
    <nav class="tiles">
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
.tiles {
  padding-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
pre {
  text-align: left;
}
</style>