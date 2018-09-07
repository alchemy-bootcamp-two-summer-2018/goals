<template>
<section class="users">
  <p v-if="!users">Loading users...</p>
  <ul v-else class="list">
    <User
      v-for="(user, index) in users"
      :key="index"
      :user="user"
    />
  </ul>


</section>
</template>

<script>
import User from './User';
import { getUsers } from '../services/api';
export default {
  data() {
    return { 
      users: null
    };
  },
  created() {
    getUsers()
      .then(users => {
        this.users = users;
      });
  },
  components: { 
    User,
  },
};
</script>

<style scoped>
section {
  padding-bottom: 100px;
}

ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 5px;
  margin: 20px;
}


</style>