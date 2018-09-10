<template>
  <div>
      <h2 v-if="user">Our User's Goals</h2>
      <div class="goal-container">
        <div
          class="user-goals"
          v-if="users"
          v-for="user in users"
          :key="user.id">
          <h3> {{ user.email }} </h3>
          <div v-if="user.goals[0]">
            <p>Goals:</p>
            <ul
              v-for="goal in user.goals"
              :key="goal.id">
              <li> {{ goal.goal }} </li>
            </ul>
          </div>
        </div>
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
      });
  }
};
</script>

<style scoped>

  .goal-container {
    display: flex;
  }

  .user-goals {
    border: 1px solid blue;
  }

</style>
