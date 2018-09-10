<template>
  <div>
    <h2>I am the Users component</h2>
    <pre v-if="error">{{ error }}</pre>
    <ul v-if="users">
      <li
        v-for="user in users"
        :key="user.id"
      >
        <RouterLink :to="`/users/${user.id}`">
          {{ user.password }} {{ user.name }} 
          ({{ user.goalCount }} 
          goal{{ user.goalCount !== 1 ? 's' : '' }})
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { getUsers } from '../services/api';
export default {
  data() {
    return {
      users: null,
      error: null
    };
  },
  created() {
    // if this wasn't in created, we'd need to reset error
    // this.error = null;
    getUsers()
      .then(users => {
        this.users = users;
      })
      .catch(err => {
        this.error = err;
      });
  }
};
</script>

<style scoped>
pre {
  color: red;
}
</style>