<template>
  <div>


    <nav class="tiles">
      <NavLink to="/goals/list">List</NavLink>
      &nbsp;
      <NavLink to="/goals/new">Add</NavLink>
    </nav>
    <RouterView 
      :goals="goals"
      :on-add="handleAdd"
    ></RouterView>
  
  </div>
</template>

<script>
import NavLink from './NavLink';
import { addGoal, getGoals } from '../services/api';


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

a {
  text-decoration: none;
}

</style>