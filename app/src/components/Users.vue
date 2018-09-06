<template>
<section class="users">
  <p v-if="!users">Loading users...</p>
  <ul v-else class="list">
    <User
      class="user"
      v-for="(user, index) in users"
      :key="index"
      :user="user"
    />
  </ul>


</section>
</template>

<script>
import User from './User';
import { getUsersandGoals } from '../services/api';
export default {
  data() {
    return { 
      users: null
    };
  },
  created() {
    getUsersandGoals()
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
.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 5px;
  text-align: left;
  padding: 0;
  margin-left: 5px;
  margin-right: 5px;
  list-style-type: none; 
}

.user {
  border: 1px solid #E6FDFF
}
</style>