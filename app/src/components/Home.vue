<template>
  <div>
      <h2 v-if="users">Our User's Goals</h2>
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
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
      grid-gap: 20px;
  }
  .user-goals {
    border: 1px solid blue;
  }

  .user-goals {
        border: 2px solid rgb(196, 249, 255);
        max-width: 300px;
        background-color: white;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: rgb(58, 75, 172);
    }

</style>
