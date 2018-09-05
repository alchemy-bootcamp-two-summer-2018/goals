<template id="goal-template">
  <section class="goal-form">
    <form @submit.prevent="handleSubmit">
      <FormControl label="Goal">
        <input type="text" 
          name="goal" placeholder="Goal" required
          v-model="edit.goal">
      </FormControl>

      <FormControl label="Status">
        <input type="text" name="status" placeholder="Status" required
          v-model.number="edit.status">
      </FormControl>

      <FormControl>
        <button type="submit">{{ label }}</button>
      </FormControl>
    </form>
    <pre>{{ error }}</pre>
  </section>
</template>

<script>
export default {
  props: {
    label: String
  }
};
</script>

<style>

</style>