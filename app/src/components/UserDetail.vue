<template>
  <div v-if="user !== null">
    <h2>{{ user.name }} {{ quadrant.password }}</h2>
    <nav>
      <NavLink :to="`/users/${user.id}/list`">list</NavLink>
      &nbsp;
      <NavLink :to="`/users/${user.id}/map`">map</NavLink>
      &nbsp;
      <NavLink :to="`/users/${user.id}/new`">add</NavLink>
    </nav>

    <RouterView 
      :goals="user.goals"
      :goalId="goal.id"
      :on-add="handleAdd"
    ></RouterView>
  
  </div>
</template>

<script>
import { getUser, addGoal } from '../services/api';
import NavLink from './NavLink';
export default {
  components: {
    NavLink
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    getUser(this.$route.params.id)
      .then(user => {
        this.user = user;
      });
  },
  methods: {
    handleAdd(goal) {
      goal.userId = this.user.id;
      return addGoal(goal)
        .then(saved => {
          this.user.goals.push(saved);
          this.$router.push(`/users/${this.userId}`);
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