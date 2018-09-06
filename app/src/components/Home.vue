<template>
  <div>
      <h2>Our User's Goals</h2>
      <div 
        v-if="users"
        v-for="user in users"
        :key="user.id">
        <h3> {{ user.email }} </h3>
        <p>Goals:</p>
        <ul 
          v-if="user.goals"
          v-for="goal in user.goals"
          :key="goal.id">
            <li> {{ goal.goal }} </li>
        </ul>
      </div>
  </div>
</template>

<script>
import { getUsers } from '../services/api';

export default {
  data() {
    return {
      users: null,
      goals: null
    };
  },
  created() {
    getUsers()
      .then(users => {
        this.users = users;
        console.log('users', this.users);
      });
  }
};
</script>

<style>

</style>
