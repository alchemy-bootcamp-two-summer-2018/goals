<template>
  <section>
    <h1>How you stack up to other users!</h1>

    <div v-fo="use=user"
      :key="use.email">
      {{ use.email }}
    </div>

    <!-- <div v-for="user in users"
      :key="user.id">
      {{user.name}} 
    </div> -->

  </section>
</template>

<script>

export default {
  props: {
    users: Array,
    user: Array
  },
};
</script>

<style>

</style>
