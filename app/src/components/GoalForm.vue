<template>
  <section class="goal-form">
    <form @submit.prevent="handleSumbit">
      <FormControl label="Name">
        <input type="text"
          name="name" placeholder="Name" required
          v-model="edit.name">
      </FormControl>
    </form>
  </section>
</template>

<script>
export default {

};
</script>

<style>

</style>
