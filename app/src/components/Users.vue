<template>
    <div>
    <h2>Users</h2>
    <pre v-if="error">{{ error }}</pre>
    <ul v-if="users">
      <li
        v-for="user in users"
        :key="user.id"
      >
        <RouterLink :to="`/users/${user.id}`">
          {{ user.email }} {{ user.password }} 
=        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

};
</script>

<style>

</style>
